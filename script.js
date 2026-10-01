const BOT_TOKEN = "8171871905:AAHFmO_pdRbfIamTGUAMjTD7oCoO8M4Gdj0";
const CHAT_ID = "8151790793";

const form = document.getElementById("contactForm");
const button = document.getElementById("sendButton");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  button.disabled = true;
  status.textContent = "Sending...";
  status.className = "status";

  const text = `
📩 New Message

📧 Email:
${email}

💬 Message:
${message}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed");
    }

    status.textContent = "Message sent successfully ✓";
    status.className = "status success";

    form.reset();

  } catch (error) {

    console.error(error);

    status.textContent = "Something went wrong.";
    status.className = "status error";

  } finally {

    button.disabled = false;

  }
});
