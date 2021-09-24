const client = require("../index");

client.on("messageCreate", async (message) => {
  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
  const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}> `);

  let prefix = message.content.match(mentionRegexPrefix)
    ? message.content.match(mentionRegexPrefix)[0]
    : client.config.prefix;

  if (message.content.match(mentionRegex))
    message.channel.send(
      `My prefix for ${message.guild.name} is \`${prefix}\`.`
    );

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args);
});

