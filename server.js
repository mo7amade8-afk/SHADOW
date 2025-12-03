import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { DarkSystem } from "./darkseckt.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const dark = new DarkSystem();

app.get("/", (req, res) => {
  res.send("Bot server is running.");
});

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    const result = await dark.handleMessage(data);

    res.status(200).json({
      ok: true,
      result: result
    });

  } catch (err) {
    console.error("[SERVER] ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
