import express from "express";
import "dotenv/config";

import { getStatus } from "controller/dpdController";

const app = express();

const url = process.env.DPD_URL;
const port = process.env.PORT;

console.log(url);

app.get("/", getStatus);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
