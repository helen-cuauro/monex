require('dotenv').config(); // Añade esto al inicio para cargar variables de entorno
const { MongoClient, ServerApiVersion } = require('mongodb');

// Usar la variable de entorno
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI no está definida en el archivo .env');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log("Conectando a MongoDB...");
    await client.connect();
    
    console.log("Enviando ping para verificar conexión...");
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexión exitosa a MongoDB!");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
    console.error("Detalles completos del error:", error);
  } finally {
    await client.close();
    console.log("Cliente cerrado.");
  }
}

run().catch(console.dir);