import "dotenv/config";
import { MongoClient } from "mongodb";

async function initializeDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db("currency_exchange");

    // Create collections
    await db.createCollection("exchange_services", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "logo", "buy", "sell", "url"], // Include 'name' here
          properties: {
            name: { bsonType: "string" }, // 'name' as a string
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

    // Insert initial data with 'name' added
    await db.collection("exchange_services").insertMany([
      {
        name: "Western Union", // Added 'name'
        logo: "https://s3-ced-uploads-01.s3.amazonaws.com/1703611552019-western-union.svg",
        buy: 3.725,
        sell: 3.752,
        url: "/western-union",
      },
      {
        name: "Cambia Fx", // Added 'name'
        logo: "https://s3-ced-uploads-01.s3.amazonaws.com/1730215210306-cambia-fx-2.svg",
        buy: 3.722,
        sell: 3.750,
        url: "/cambia-fx",
      },
      {
        name: "Dichikash", // Added 'name'
        logo: "https://s3-ced-uploads-01.s3.amazonaws.com/1703885241775-dichikash.svg",
        buy: 3.729,
        sell: 3.756,
        url: "/dichikash",
      },
      {
        name: "Cambio Mundial", // Added 'name'
        logo: "https://s3-ced-uploads-01.s3.amazonaws.com/1706405397247-cambiomundial-2.svg",
        buy: 3.720,
        sell: 3.748,
        url: "/cambio-mundial",
      },
    ]);

    await db.collection("dollar_prices").insertMany([
      { entity: "Sunat", buy: 3.735, sell: 3.761 },
      { entity: "Parallel Market", buy: 3.738, sell: 3.765 },
    ]);

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  } finally {
    await client.close();
  }
}

initializeDatabase();
