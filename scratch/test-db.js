const { MongoClient } = require('mongodb');

async function test() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set");
    process.exit(1);
  }
  console.log("Testing connection...");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully");
    const db = client.db("tiles-gallery");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

test();
