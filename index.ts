import fastify from "fastify";

const app = fastify();

let users: string[] = [];
async function run() {
  app.get("/users", async () => {
    return { users };
  });

  // /add_user?username=PEDRO
  app.get<{ Querystring: { username: string } }>("/add_user", async (req) => {
    const { username } = req.query;

    const upperUsername = username.toUpperCase();

    if (users.includes(upperUsername)) return { ok: false };
    users.push(upperUsername);

    return { ok: true };
  });

  app.listen({
    port: 3040,
    host: "0.0.0.0",
  });

  console.log(`Server running on http://localhost:3040!`);
}

run();
