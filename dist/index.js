import express from "express";
import "dotenv/config";
const app = express();
const url = process.env.DPD_URL;
const port = process.env.PORT;
console.log(url);
app.get("/", (requtest, response) => {
    response.send("Work");
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
