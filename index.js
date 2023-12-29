const dotenv = require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
const client = new Client({
    checkUpdate: false, // Disable update check
});

// Use c.ai plus
characterAI.requester.usePlus = false;
// Keyword
const keyword = "ganyu"; // Ganyu
// Set the character id
const charId = "I3OCwWQKKEj12lt3mpLvHRyrBdXgotqVUHg0MzAGmSk"; // Ganyu

client.on("messageCreate", async (message) => {
    // Listen for message that contains the keyword or ping
    if (
        message.content.toLowerCase().includes(keyword) ||
        message.mentions.has(client.user)
    ) {
        let messageContent = message.content;

        // if the author is a bot, return
        if (message.author.bot) return;

        // if message reply is from the bot itself, return
        if (message.author.id === client.user.id) return;

        // check if the message contains the ping (eg: <@742595350413443102>), remove it and parse the message only
        if (messageContent.includes("<@")) {
            messageContent = messageContent.replace(/<@.*>/, "");
        }

        // If the message is empty, set it to "Hi!"
        if (!messageContent) {
            messageContent = "Hi!";
        }

        // console.log(messageContent);
        message.channel.sendTyping();

        (async () => {
            // c.ai part
            const chat = await characterAI.createOrContinueChat(charId);
            const response = await chat.sendAndAwaitResponse(
                messageContent,
                true
            );
            message.reply(response.text);
        })();
    }
});

// Authenticate with the c.ai API
async function authenticate() {
    await characterAI.authenticateWithToken(process.env.caiToken);
}

authenticate()
    .then(() => {
        // Authentication completed
        console.log("c.ai authentication completed");

        // Authenticate with Discord
        client.login(process.env.Token);
    })
    .catch((error) => {
        console.error("c.ai authentication failed:\n", error);
    });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});
