const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
    ],
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.config = require("./config.json");

// Initializing the project
client.on("ready", () => require("./handler")(client));

client.login(client.config.token);
