import fs from "fs";
import path from "path";

export function reportImage(bot, msg) {
    const reportPath = path.resolve("./reports.json");

    const reportData = {
        user: msg.from.username,
        userId: msg.from.id,
        date: new Date(),
        file: msg.text
    };

    let file = [];
    if (fs.existsSync(reportPath)) {
        file = JSON.parse(fs.readFileSync(reportPath));
    }

    file.push(reportData);
    fs.writeFileSync(reportPath, JSON.stringify(file, null, 2));

    bot.sendMessage(msg.chat.id, "Report submitted.");
}
