const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const ultronState = {
  version: "1.0",
  core: "ONLINE",
  aiConnected: false,
  memory: true
};

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addMessage(sender, text, type) {
  const message = document.createElement("div");

  message.className =
    type === "you"
      ? "message you-message"
      : "message ultron-message";

  message.innerHTML = `
    <div class="label">${sender}</div>
    <div class="message-text">${escapeHTML(text)}</div>
  `;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function getStatus() {
  return `ULTRON 1.0 STATUS

Core: ONLINE
Interface: ONLINE
Command System: ONLINE
AI Core: ${ultronState.aiConnected ? "ONLINE" : "OFFLINE"}
Memory: ${ultronState.memory ? "ENABLED" : "DISABLED"}

Backend connection will be added in the next phase.`;
}

function getHelp() {
  return `ULTRON COMMAND SYSTEM

/help
Show available commands.

/status
Show ULTRON system status.

/memory
Show memory status.

/clear
Clear the current conversation.

/connect ai
Prepare the AI connection.

Normal messages will be sent to the AI backend once it is connected.`;
}

function handleCommand(command) {
  const parts = command.trim().split(/\s+/);
  const action = parts[0].toLowerCase();

  switch (action) {
    case "/help":
      return getHelp();

    case "/status":
      return getStatus();

    case "/memory":
      return `MEMORY MODULE: ${
        ultronState.memory ? "ENABLED" : "DISABLED"
      }`;

    case "/clear":
      chat.innerHTML = "";

      return "Conversation display cleared.";

    case "/connect":
      if (parts[1]?.toLowerCase() === "ai") {
        return "AI connection module initialized. Secure backend connection will be installed next.";
      }

      return "Unknown connection target. Use /connect ai";

    default:
      return "Command not recognized. Type /help.";
  }
}

function sendMessage() {
  const text = input.value.trim();

  if (!text) {
    return;
  }

  addMessage("YOU", text, "you");

  input.value = "";

  let response;

  if (text.startsWith("/")) {
    response = handleCommand(text);
  } else {
    response =
      "Message received.\n\n" +
      "ULTRON core is operational, but the AI backend has not been connected yet.";
  }

  setTimeout(() => {
    addMessage("ULTRON", response, "ultron");
  }, 250);
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
