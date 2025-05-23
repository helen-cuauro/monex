import "dotenv/config";
import { MongoClient } from "mongodb";
import axios from "axios";
import * as cheerio from "cheerio";
import cron from "node-cron";

// Conexión a MongoDB fuera de la función GET, manteniendo la conexión activa
let client: MongoClient;

async function connectMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const { data } = await axios.get("https://cuantoestaeldolar.pe/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    const casasDeCambio = $(".ExchangeHouseItem_item_col__gudqq")
      .map((_, element) => {
        const $element = $(element);
        const nombre = $element.find("a img").attr("alt")?.trim();
        const imagen = $element.find("a img").attr("src");

        const compra = $element
          .find(
            ".ValueCurrency_content_buy__Z9pSf .ValueCurrency_item_cost__Eb_37"
          )
          .text()
          .trim();
        const venta = $element
          .find(
            ".ValueCurrency_content_sale__fdX_P .ValueCurrency_item_cost__Eb_37"
          )
          .text()
          .trim();

        const url = $element.find("a.Button_button_change__PYUxL").attr("href");

        if (nombre && compra && venta && imagen && url) {
          return {
            name: nombre,
            logo: imagen,
            buy: parseFloat(compra),
            sell: parseFloat(venta),
            url,
          };
        }
        return null;
      })
      .get();

    const mongoClient = await connectMongo();
    const db = mongoClient.db("cambio_online");
    const collection = db.collection("exchange_services");

    const now = new Date();
    for (const casa of casasDeCambio) {
      const existingCasa = await collection.findOne({ name: casa.name });

      if (existingCasa) {
        if (existingCasa.buy !== casa.buy || existingCasa.sell !== casa.sell) {
          await collection.updateOne(
            { name: casa.name },
            {
              $set: {
                buy: casa.buy,
                sell: casa.sell,
                logo: casa.logo,
                url: casa.url,
                updatedAt: now,
              },
            }
          );
          console.log(`✅ Actualizado: ${casa.name}`);
        }
      } else {
        await collection.insertOne({...casa,  updatedAt: now });
        console.log(`✅ Insertado nuevo: ${casa.name}`);
      }
    }

    return new Response(JSON.stringify({ casasDeCambio }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    console.error(
      "Detalles:",
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    return new Response(JSON.stringify({ error: "Error al obtener datos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Programar la ejecución periódica cada 1 minutos
cron.schedule("*/1 * * * *", async () => {
  console.log("Ejecutando actualización de casas de cambio...");
  await GET();
});
