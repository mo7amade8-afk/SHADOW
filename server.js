import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import darkseckt from "./darkseckt.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// health check
app.get("/", (req, res) => res.send("OK"));

// webhook endpoint: forward full update to darkseckt for handling
app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // respond quickly to Telegram

  try {
    const update = req.body;
    if (!update) return;

    // delegate all logic to darkseckt module
    // darkseckt.processUpdate(update) should handle everything (no token here)
    await darkseckt.processUpdate(update);
  } catch (err) {
    console.error("Error in /webhook:", err);
  }
});

// use PORT from environment (Render provides it)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
