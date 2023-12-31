import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(method, url);
  await json(req, res);
  console.log(req.body);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };
    database.insert("users", user);

    return res.writeHead(201).end("create users");
  }
  return res.writeHead(404).end();
});

server.listen(3333);
