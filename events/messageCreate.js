const client = require("../index");


client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.guild.me.permissions.has('SEND_MESSAGES') ||
        !message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES') ||
    )
        return;

        if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;
        const args = message.content.slice(client.config.prefix.length.trim().split(/ +/);

        const cmd = args.shift();

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    if (!message.member.permissions.has(command.memberPermissions || [])) return message.channel.send({content: `I need **\`${command.memberPermissions}\`** to use this command!`});
    if (!command) return;
    await command.run(client, message, args);
});
