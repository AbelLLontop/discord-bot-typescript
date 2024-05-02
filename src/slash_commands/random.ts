import { SlashCommandBuilder } from "discord.js";
import { SlashCommandInterface } from "../interfaces/SlashCommand.interface";

const command:SlashCommandInterface = {
    data:new SlashCommandBuilder()
    .setName("random")
    .setDescription("Genera un número random del 1 al 10"),
    async execute(interaction) {
        const randomNumber = Math.floor(Math.random()*10)+1
        await interaction.reply(`🎲 Tu número random es: ${randomNumber}`)
    },
}

export default command;