const client = require("../index");

client.on("messageUpdate", async (oldMessage,newMessage) => {
    if (
        newMessage.author.bot ||
        !newMessage.guild ||
        !newMessage.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = newMessage.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, newMessage, args);
});

/*
* This lets you use bot on edited message, reduces time to retype for typos
*/
