import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function initializeDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db("cambio_online");

    // Crear colecciones
    await db.createCollection("exchange_services", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "compra", "venta", "url"],
          properties: {
            name: { bsonType: "string" },
            compra: { bsonType: "double" },
            venta: { bsonType: "double" },
            url: { bsonType: "string" }
          }
        }
      }
    });

    await db.createCollection("dollar_prices", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["entidad", "compra", "venta"],
          properties: {
            entidad: { bsonType: "string" },
            compra: { bsonType: "double" },
            venta: { bsonType: "double" }
          }
        }
      }
    });

    // Insertar datos iniciales
    await db.collection("exchange_services").insertMany([
      { name: "Western Union", compra: 3.725, venta: 3.752, url: "/western-union" },
      { name: "Cambia Fx", compra: 3.725, venta: 3.752, url: "/cambia-fx" }
    ]);

    await db.collection("dollar_prices").insertMany([
      { entidad: "Sunat", compra: 3.725, venta: 3.752 },
      { entidad: "Paralelo", compra: 3.725, venta: 3.752 }
    ]);

    console.log("✅ Base de datos inicializada correctamente");
    
  } catch (error) {
    console.error("❌ Error inicializando DB:", error);
  } finally {
    await client.close();
  }
}

initializeDatabase();