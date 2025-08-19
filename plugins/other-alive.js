const config = require('../settings');
const axios = require('axios');
const { malvin, commands } = require('../malvin');

malvin({
  pattern: "live",
  desc: "Check if the bot is alive.",
  category: "main",
  react: "🟢",
  filename: __filename
},
async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    const caption = `
*👋 Hello ${pushname}! I'm alive and running...*

╭── 〘 𝗟𝗨𝗖𝗞𝗬-𝗫𝗗 〙
│✨ *Name* : Lucky-XD
│👑 *Creator* : Tomi Lucky 
│⚙️ *Version* : ${config.version}
│📂 *Script Type* : Plugins
╰─────────────⭑

🧠 I’m an automated WhatsApp assistant that helps you get data, search, and more – all inside WhatsApp!

*❗ Please follow the rules:*
1. 🚫 No spam
2. 🚫 Don’t call the bot
3. 🚫 Don’t call the owner
4. 🚫 Don’t spam the owner

🔖 Type *.menu* to explore all commands.

© 2025 Lucky 218
    `.trim();

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/4itzeu.jpg' },
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363420656466131@newsletter',
          newsletterName: 'Lucky Tech Hub',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply(`❌ Error: ${err}`);
  }
});
