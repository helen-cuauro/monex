import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db("cambio_online");
    const data = await db.collection("exchange_services").find({}).toArray();

    const updatedAt = data.reduce((max, item) => {
      return item.updatedAt && item.updatedAt > max ? item.updatedAt : max;
    }, new Date(0));

    return NextResponse.json({ services: data, updatedAt });
  } catch (error) {
    console.error("Error en /api/exchangeServices:", error);
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
