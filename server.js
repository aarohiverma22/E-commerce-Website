import express from "express";
const app = express();
import "dotenv/config";
const port = process.env.PORT || 6000;
import status from "express-status-monitor";    //monitor real time server status
import bodyParser from "body-parser";   //allow to access sent data request
import cors from "cors";  //Cross origin resource sharing-> accept all request from different domains
import db from "./utils/database/db.js";
import route from "./utils/routers/user.routes.js";

app.use(bodyParser.urlencoded({ extended: true }));   //middleware parse incoming payloads
app.use(cors("*"));
app.use(status());
app.use(bodyParser.json());   //middleware parses incoming request with JSON payload
import path from "path";
const publicDir = path.join("./public");
const cardDir = path.join("./public/cards");
app.use("/public", express.static(publicDir));
app.use("/cards", express.static(cardDir));

app.set("view engine", "ejs");

// ! database
db();

// ! apis here
app.use("/api/v1", route);
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
