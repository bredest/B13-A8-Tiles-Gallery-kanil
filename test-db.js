const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  console.log("Testing connection to:", uri.split('@')[1]); // Don't log full URI for privacy
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("tiles-gallery");
    const collections = await db.listCollections().toArray();
    console.log("Collections in 'tiles-gallery':", collections.map(c => c.name));
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await client.close();
  }
}

testConnection();
