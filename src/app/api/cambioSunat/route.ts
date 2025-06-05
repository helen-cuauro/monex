import "dotenv/config";
import { MongoClient } from "mongodb";
import axios from "axios";

const MONGODB_URI = process.env.MONGODB_URI!;
const API_URL = "https://free.e-api.net.pe/tipo-cambio/today.json";

let client: MongoClient;

async function connectMongo() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const response = await axios.get(API_URL);
    const { compra, venta } = response.data;

    const mongoClient = await connectMongo();
    const db = mongoClient.db("cambio_online");
    const collection = db.collection("dollar_prices");

    const entity = "Sunat";

    // Actualiza si existe, si no, inserta
    await collection.updateOne(
      { entity },
      {
        $set: {
          buy: parseFloat(compra),
          sell: parseFloat(venta),
        },
      },
      { upsert: true }
    );

    console.log(`✅ SUNAT actualizado: Compra ${compra} | Venta ${venta}`);

    return new Response(JSON.stringify({ compra, venta }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener tipo de cambio SUNAT:", error);
    return new Response(JSON.stringify({ error: "Error obteniendo SUNAT" }), {
      status: 500,
    });
  }
}

