const { malvin } = require("../malvin");
const moment = require("moment-timezone");
const config = require("../settings"); 
const os = require("os");
const { runtime } = require('../lib/functions');
let botStartTime = Date.now();

const ALIVE_IMG = config.ALIVE_IMAGE || "https://files.catbox.moe/4itzeu.jpg" ;

malvin({
  pattern: "alive",
  alias: ["uptime","runtime"],
  desc: "Check if the bot is active.",
  category: "info",
  react: "🚀",
  filename: __filename
}, async (conn, mek, m, { reply, from }) => {
  try {
    const pushname = m.pushName || "User";
    const harareTime = moment().tz("Africa/Kampala").format("HH:mm:ss");
    const harareDate = moment().tz("Africa/Kampala").format("dddd, MMMM Do YYYY");
    const runtimeMilliseconds = Date.now() - botStartTime;
    const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
    const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
    const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));
    const formattedInfo = `
 🤴 \`LUCKY XD STATUS\` 🤴 

  *Hi👋😄 ${pushname}*

 *⏰ Time: ${harareTime}*
 *📆 Date: ${harareDate}*
 *⏳️ Uptime: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds*
 *🚀 Ram Usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*


 \`Status\`: *Lucky is online! 🤗🚀*

> Powered By Lucky Tech Hub
🔗 ${config.REPO}
`.trim();

    if (!ALIVE_IMG || !ALIVE_IMG.startsWith("http")) {
      throw new Error("Invalid ALIVE_IMG URL. Please set a valid image URL.");
    }

    await conn.sendMessage(from, {
      image: { url: ALIVE_IMG },
      caption: formattedInfo,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363420656466131@newsletter',
          newsletterName: '⁑ ʟᴜᴄᴋʏ xᴅ ⁑ ',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/3v5i11.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
    
  } catch (error) {
    console.error("Error in alive command: ", error);
    const errorMessage = `
 An error occurred while processing the alive command.
 Error Details: ${error.message}
Please report this issue or try again later.
`.trim();
    return reply(errorMessage);
  }
});
