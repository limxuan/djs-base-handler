const client = require("../index");

client.on("ready", () =>
    console.log(`--------------------------------\n${client.user.tag} is online!\n${client.user.tag} is in${client.guilds.cache.size} guilds\n--------------------------------`)
);
