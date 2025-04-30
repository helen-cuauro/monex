import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('mi_app');
  const collection = db.collection('productos');

  const productos = await collection.find({}).toArray();

  return NextResponse.json(productos);
}
