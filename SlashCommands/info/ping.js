const { Client, CommandInteraction, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: ApplicationCommandOptionType.ChatInput,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `${client.ws.ping}ms!` });
    },
};
