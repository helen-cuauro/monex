import "dotenv/config";
import { MongoClient } from "mongodb";

async function initializeDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db("cambio_online");

    // Create collections
    await db.createCollection("exchange_services", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "logo", "buy", "sell", "url"], // Include 'name' here
          properties: {
            name: { bsonType: "string" },
            logo: { bsonType: "string" },
            buy: { bsonType: "double" },
            sell: { bsonType: "double" },
            url: { bsonType: "string" },
          },
        },
      },
    });

    await db.createCollection("dollar_prices", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["entity", "buy", "sell"],
          properties: {
            entity: { bsonType: "string" },
            buy: { bsonType: "double" },
            sell: { bsonType: "double" },
          },
        },
      },
    });

   
    // Insertar datos predeterminados para 'dollar_prices'
    await db.collection("dollar_prices").insertMany([
      { entity: "Sunat", buy: 3.735, sell: 3.761 },
      { entity: "Paralelo", buy: 3.738, sell: 3.765 },
    ]);

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  } finally {
    await client.close();
  }
}

initializeDatabase();
