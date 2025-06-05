import { NextResponse } from "next/server";
import puppeteer, { Browser, Page } from "puppeteer";
import "dotenv/config";
import { MongoClient } from "mongodb";

const URL = "https://cuantoestaeldolar.pe/bolsa-de-valores";
const NEXT_BTN_SEL = "button.page_arrowPaginate__iLdXq";

// Conexión a MongoDB
let mongoClient: MongoClient;

async function connectMongo() {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await mongoClient.connect();
  }
  return mongoClient;
}

async function launchBrowser(): Promise<Browser> {
  return puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

async function getTableHeaders(page: Page): Promise<string[]> {
  return page.$$eval("table thead tr th", (ths) =>
    ths.map((th) => th.textContent?.trim() ?? "")
  );
}

async function getTableRows(page: Page): Promise<string[][]> {
  return page.$$eval("table tbody tr", (trs) =>
    trs.map((tr) =>
      Array.from(tr.querySelectorAll("td")).map(
        (td) => td.textContent?.trim() ?? ""
      )
    )
  );
}

async function clickNext(page: Page): Promise<boolean> {
  const hasNext = await page.evaluate((sel) => {
    const btns = Array.from(document.querySelectorAll<HTMLButtonElement>(sel));
    const nextBtn = btns.at(-1);
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
      return true;
    }
    return false;
  }, NEXT_BTN_SEL);

  if (hasNext) await new Promise((resolve) => setTimeout(resolve, 1500));
  return hasNext;
}

// Normaliza encabezados para usar como keys en MongoDB
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '_');
}

// Convierte valores numéricos a números
function parseValue(value: string): string | number {
  const cleaned = value
    .replace(/,/g, '')
    .replace(/%/g, '');

  const num = parseFloat(cleaned);
  return isNaN(num) ? value : num;
}

export async function GET() {
  let browser: Browser | null = null;

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("table");

    const headers = (await getTableHeaders(page)).map(normalizeHeader);
    const rows: string[][] = [];

    do {
      rows.push(...(await getTableRows(page)));
    } while (await clickNext(page));

    // Procesar datos para MongoDB
    const processedData = rows.map(row => {
      const obj: Record<string, string | number> = {};
      row.forEach((cell, index) => {
        obj[headers[index]] = parseValue(cell);
      });
      return obj;
    });

    // Conectar a MongoDB
    const client = await connectMongo();
    const db = client.db("cambio_online");
    const collection = db.collection("bolsa_valores");

    const now = new Date();
    const bulkOps = processedData.map(data => ({
      updateOne: {
        filter: { [headers[0]]: data[headers[0]] }, // Usar primera columna como ID
        update: {
          $set: { ...data, updatedAt: now },
          $setOnInsert: { createdAt: now }
        },
        upsert: true
      }
    }));

    if (bulkOps.length > 0) {
      await collection.bulkWrite(bulkOps);
    }

    return NextResponse.json({
      message: `${processedData.length} registros actualizados en MongoDB`,
      data: processedData
    });

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Error en el proceso" },
      { status: 500 }
    );
  } finally {
    await browser?.close();
  }
}