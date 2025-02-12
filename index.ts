import fastify from "fastify";

const app = fastify();

async function run() {
  app.get("/", async () => {
    return {
      now: new Date(),
    };
  });

  app.listen({
    port: 3040,
    host: "0.0.0.0",
  });

  console.log(`Server running on http://localhost:3040!`);
}

run();
