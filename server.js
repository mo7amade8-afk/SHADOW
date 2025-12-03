import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { DarkSystem } from "./darkseckt.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const dark = new DarkSystem();

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    const result = await dark.handleMessage(data);
    res.json({ ok: true, result });
  } catch (err) {
    console.error("[SERVER ERROR]", err);
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Bot server is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Active on PORT ${PORT}`);
});
