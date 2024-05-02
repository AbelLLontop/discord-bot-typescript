import { SlashCommandBuilder } from "discord.js";
import { SlashCommandInterface } from "../interfaces/SlashCommand.interface";

const command:SlashCommandInterface = {
    data:new SlashCommandBuilder()
    .setName('say')
    .setDescription('El bot dira lo que tu desees.')
    .addStringOption(option=>option
        .setName('mensaje')
        .setDescription('Mensaje que repetira el bot')
        .setMinLength(5)
        .setMaxLength(100)
        .setRequired(true)
    ),
    async execute(interaction) {
        const text = interaction.options.getString("mensaje")!;
        await interaction.reply(text);
    },
}
export default command;