import express from "express";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Load main controller
import DarkSystem from "./darkseckt.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Dark System
const dark = new DarkSystem(app);

// Root endpoint
app.get("/", (req, res) => {
    res.send("Shadow Core System Running...");
});

// Start server
app.listen(PORT, () => {
    console.clear();

    // Fancy banner
    console.log(
        gradient(["#ff0066", "#9b00ff"])(
            figlet.textSync("SHADOW SYSTEM", {
                font: "ANSI Shadow",
                horizontalLayout: "default",
            })
        )
    );

    // Decorative lines
    const deco = gradient(["#ff0040", "#b300ff"])(
        "★.･*:｡≻──── ⋆☆⋆ ────.•*:｡★"
    );

    console.log("\n" + deco);
    console.log(
        chalk.hex("#ff0040")("Server Status: ") +
        chalk.hex("#00ff9d")("ONLINE ✨")
    );
    console.log(
        chalk.hex("#9b00ff")("Listening on port: ") +
        chalk.hex("#00d0ff")(PORT)
    );
    console.log(deco + "\n");

    // Log system link if on Render
    if (process.env.RENDER) {
        console.log(
            chalk.hex("#ff00aa")("Render Deployment Active ✔")
        );
    }

    console.log(deco);
});
