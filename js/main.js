const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatClose = document.getElementById("chat-close");
const chatMessages = document.getElementById("chat-messages");

chatToggle.onclick = () => {
  chatWidget.style.display = "flex";
};

chatClose.onclick = () => {
  chatWidget.style.display = "none";
};

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-message");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  const response = await fetch("https://YOUR-N8N-WEBHOOK-URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      sessionId: getSessionId()
    })
  });

  const data = await response.json();
  addMessage("AI", data.reply);
}

function getSessionId() {
  let sessionId = localStorage.getItem("chatSession");
  if (!sessionId) {
    sessionId = "session-" + Math.random().toString(36).substring(2);
    localStorage.setItem("chatSession", sessionId);
  }
  return sessionId;
}
