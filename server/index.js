import express from "express";
import {webcrypto} from "crypto";
import cors from "cors";
import compression from "compression";
import {resolve} from "path";
import {Environment} from "@aminnairi/environment";

const publicPath = process.env.NODE_ENV === "development" ? "../build/client" : "build/client";
const environment = await Environment.from(resolve(publicPath, "../../.env"));

const server = express();

server.use(cors({origin: "*"}));
server.use(compression({level: 9}));

server.use(express.static(publicPath));

server.get("/api/users", (request, response) => {
  response.json([
    {
      id: webcrypto.randomUUID(),
      firstname: "John",
      lastname: "DOE",
      email: "johndoe@gmail.com"
    },
    {
      id: webcrypto.randomUUID(),
      firstname: "Jane",
      lastname: "DOE",
      email: "janedoe@gmail.com"
    }
  ]);
});

server.all("*", (request, response) => {
  response.sendFile(resolve(publicPath, "index.html"));
});

server.listen(environment.SERVER_PORT, () => {
  console.log("Listening!");
});
