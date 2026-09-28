const form = document.getElementById("contactForm");
const button = document.getElementById("sendButton");
const status = document.getElementById("status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!email || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }
  button.disabled = true;
  button.classList.add("loading");
  status.textContent = "";
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }
    form.reset();
    showStatus("Message sent successfully ✓", "success");
  } catch (error) {
    console.error(error);
    showStatus("Failed to send the message. Please try again.", "error");
  } finally {
    button.disabled = false;
    button.classList.remove("loading");
  }
});
function showStatus(text, type) {
  status.textContent = text;
  status.className = `status ${type}`;
}
