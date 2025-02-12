import fastify from "fastify";
import { MongoClient, ServerApiVersion } from "mongodb";
import FastifyCors from "@fastify/cors";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = fastify();
app.register(FastifyCors);

interface IUser {
  name: string;
}

async function run() {
  // MongoDB
  await client.connect();
  const db = client.db("aulinha");
  const usersCollection = db.collection<IUser>("users");

  // Fastify
  app.get("/users", async () => {
    const allUsers = await usersCollection.find().toArray();

    return { allUsers };
  });

  // /add_user?username=PEDRO
  app.get<{ Querystring: { username: string } }>("/add_user", async (req) => {
    const { username } = req.query;

    const upperUsername = username.toUpperCase();

    const userWithSameUsername = await usersCollection.findOne({
      name: upperUsername,
    });

    if (userWithSameUsername) return { ok: false };

    await usersCollection.insertOne({
      name: upperUsername,
    });

    return { ok: true };
  });

  app.listen({
    port: 3040,
    host: "0.0.0.0",
  });

  console.log(`Server running on http://localhost:3040!`);
}

run();
