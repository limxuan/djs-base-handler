const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {

        // ephemeral.json => An Array of command names that should be a ephemeral reply.
        // For Example => If the ephemeral-json file includes "help", then the help command would be a Ephemeral reply
        const ephlist = require('../ephemeral.json');
        let isEph = ephlist.includes(interaction.commandName);

        await interaction.deferReply({
            ephemeral: isEph
        }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
});
