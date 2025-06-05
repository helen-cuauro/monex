import "dotenv/config";
import { MongoClient } from "mongodb";
import axios from "axios";
import * as cheerio from "cheerio";

// Mantiene la conexión viva entre llamadas
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
    // 1. Descarga la página
    const { data } = await axios.get("https://cuantoestaeldolar.pe/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    // 2. Extrae nombre, precios y enlace, pero NO el logo
    const casasDeCambio = $(".ExchangeHouseItem_item_col__gudqq")
      .map((_, element) => {
        const $el = $(element);
        const nombre = $el.find("a img").attr("alt")?.trim();

        const compra = $el
          .find(
            ".ValueCurrency_content_buy__Z9pSf .ValueCurrency_item_cost__Eb_37"
          )
          .text()
          .trim();

        const venta = $el
          .find(
            ".ValueCurrency_content_sale__fdX_P .ValueCurrency_item_cost__Eb_37"
          )
          .text()
          .trim();

        const url = $el.find("a.Button_button_change__PYUxL").attr("href");

        if (nombre && compra && venta && url) {
          return {
            name: nombre,
            buy: parseFloat(compra),
            sell: parseFloat(venta),
            url,
          };
        }
        return null;
      })
      .get();

    // 3. Conexión a MongoDB
    const mongoClient = await connectMongo();
    const db = mongoClient.db("cambio_online");
    const collection = db.collection("exchange_services");

    const now = new Date();

    // 4. Inserta o actualiza (sin tocar logos existentes)
    for (const casa of casasDeCambio) {
      const existente = await collection.findOne({ name: casa.name });

      if (existente) {
        // Solo actualiza precios y URL si cambiaron
        if (existente.buy !== casa.buy || existente.sell !== casa.sell) {
          await collection.updateOne(
            { name: casa.name },
            {
              $set: {
                buy: casa.buy,
                sell: casa.sell,
                url: casa.url,
                updatedAt: now,
              },
            }
          );
          console.log(`✅ Actualizado: ${casa.name}`);
        }
      } else {
        // Nuevo: logo vacío para completar a mano
        await collection.insertOne({
          ...casa,
          logo: "", // será rellenado manualmente
          updatedAt: now,
        });
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
    return new Response(JSON.stringify({ error: "Error al obtener datos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
