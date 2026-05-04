import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
const options = {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
};

let client;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
    global._mongoClientPromise = global._mongoClient.connect();
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db("tiles-gallery")),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: "https://b13-a8-tiles-gallery-kanil.vercel.app",
  trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.43.175:3000",
    "https://b13-a8-tiles-gallery-kanil.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {},
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
