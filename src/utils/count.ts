import type { UsserType, Message } from "../store/slices/resultSlice";

// Check if a message is a roleplay message
function isRoleplayMessage(message: string): boolean {
  if (
    message.includes("//") ||
    message.includes("||") ||
    message.includes("\\") ||
    message.startsWith(" |") ||
    message.startsWith(" ;") ||
    message.startsWith(` #`) ||
    message.startsWith(` _#`) ||
    message.startsWith(" &&") ||
    message.startsWith(" -") ||
    message.endsWith("|") ||
    message.endsWith(";;") ||
    message === " ."
  ) {
    return false;
  }
  return true;
}

// Filter out WhatsApp system messages
function filterWhatsAppMessages(
  messagesByUser: Record<string, Message[]>,
  participants: number
) {
  const filteredMessages: Record<string, Message[]> = {};
  const leftMessages: string[] = [];

  for (const [user, messages] of Object.entries(messagesByUser)) {
    if (
      !user.includes("changed this group's settings") &&
      !user.includes("pinned a messag") &&
      !user.includes("requested to join") &&
      !user.includes("left") &&
      !user.includes("joined using this") &&
      !user.includes("added") &&
      !user.includes("removed") &&
      !user.includes("joined from the communit") &&
      !user.includes("changed th")
    ) {
      filteredMessages[user] = messages;
    } else {
      if (
        user.includes("left") ||
        user.includes("removed") ||
        user.includes("joined") ||
        user.includes("added")
      ) {
        leftMessages.push(user);
      }
    }
  }

  const ghosts = calculateGhosts(
    leftMessages,
    Object.keys(filteredMessages).map((x) => x.trim().toLocaleLowerCase()),
    participants
  );

  return { filteredMessages, ghosts };
}

function calculateGhosts(
  log: string[],
  participantes: string[],
  totalUsers: number
): number {
  const gente = participantes.map((x) => x.slice(0, -1));
  let actualPeople = 0;
  const left = new Set();

  for (let event of log) {
    event = event.toLowerCase();

    if (event.includes("removed")) {
      const name = event.split("removed")[1].trim();
      left.add(name);
    } else if (event.includes("left")) {
      const name = event.split("left")[0].trim();
      left.add(name);
    } else if (event.includes("joined from the communit")) {
      const name = event.split("joined from the communit")[0].trim();
      left.delete(name);
    } else if (event.includes("added")) {
      const name = event.split("added")[1].trim();
      left.delete(name);
    }
  }

  const genteQueSeFue = Array.from(left);

  gente.forEach((g) => {
    if (genteQueSeFue.includes(g)) {
    } else {
      actualPeople++;
    }
  });

  return totalUsers - actualPeople;
}

// Separate messages by date
function separateMessagesByDate(
  chatExport: string[],
  date: string
): Record<string, Message[]> {
  // Format date from YYYY-MM-DD to M/D/YY
  const formattedDate = date.split("-");
  let day = formattedDate[2];
  let month = formattedDate[1];
  const year = formattedDate[0].slice(2, 4);

  if (month.startsWith("0")) month = month.slice(1);
  if (day.startsWith("0")) day = day.slice(1);

  const targetDate = `${month}/${day}/${year}`;

  const chatFiltered = chatExport.filter((line) => line.startsWith(targetDate));
  const firstElement = chatFiltered[0];

  const postElement = chatExport.indexOf(firstElement);

  // Find the position where our target date starts
  const relevantMessages = chatExport.slice(postElement - 1 + 1);

  // Parse messages
  const messagesByUser: Record<string, Message[]> = {};

  for (const message of relevantMessages) {
    const dashIndex = message.indexOf("-");
    const messageText = message.slice(dashIndex + 1);
    const dateTime = message.slice(0, dashIndex);

    const colonIndex = messageText.indexOf(":");
    const messageContent = messageText.slice(colonIndex + 1);
    const userName = messageText.slice(0, colonIndex);

    const commaIndex = dateTime.indexOf(",");
    const time = dateTime.slice(commaIndex + 1);
    const datePart = dateTime.slice(0, commaIndex);

    const fullMessage: Message = {
      fecha: datePart,
      hora: time,
      mensaje: messageContent,
    };

    if (userName) {
      if (!messagesByUser[userName]) {
        messagesByUser[userName] = [];
      }
      messagesByUser[userName].push(fullMessage);
    }
  }

  return messagesByUser;
}

// Process chat content and return user statistics
export function countRols(
  chatContent: string,
  date: string,
  participants: number
) {
  // Split content into lines and combine multi-line messages
  const lines = chatContent.split("\n");
  let combinedLines: string[] = [];
  let currentMessage = "";

  for (const line of lines) {
    if (line.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}, \d{1,2}:\d{1,2}/)) {
      // New message line
      if (currentMessage !== "") {
        combinedLines.push(currentMessage.trim());
      }
      currentMessage = line;
    } else {
      // Continuation of previous message
      currentMessage += " " + line;
    }
  }

  if (currentMessage !== "") {
    combinedLines.push(currentMessage.trim());
  }

  // Process messages
  const messagesByUser = separateMessagesByDate(combinedLines, date);
  const { filteredMessages, ghosts } = filterWhatsAppMessages(
    messagesByUser,
    participants
  );

  // Calculate user statistics
  const userStats: UsserType[] = [];

  for (const [userName, messages] of Object.entries(filteredMessages)) {
    const user: UsserType = {
      name: userName,
      messages: {
        off: [],
        on: [],
        media: [],
      },
      count: {
        off: 0,
        on: 0,
        media: 0,
        bonus: 0,
      },
    };

    for (const messageObj of messages) {
      const message = messageObj.mensaje;

      if (
        message.includes("<Media omitted>") ||
        message === "" ||
        message === " null" ||
        message.includes("<View once voice message omitted>") ||
        message === " This message was deleted" ||
        message.includes("<Multimedia omitido>")
      ) {
        // Media message
        user.messages.media.push(message);
        user.count.media++;
      } else {
        if (isRoleplayMessage(message)) {
          // Roleplay message
          user.messages.on.push(message);
          if (message.length > 766) {
            user.count.on += 15;
            user.count.bonus++;
          } else {
            user.count.on++;
          }
        } else {
          // Off-role message
          user.messages.off.push(message);
          user.count.off++;
        }
      }
    }

    userStats.push(user);
  }

  const toReturn = {
    results: userStats.sort((a, b) => b.count.on - a.count.on),
    ghosts: ghosts,
  };

  return toReturn;
}
