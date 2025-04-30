import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server.js';

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  
  try {
    await client.connect();
    const db = client.db("cambio_online");
    const data = await db.collection("dollar_prices")
                      .find({})
                      .sort({ entidad: 1 })
                      .toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}