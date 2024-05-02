import { SlashCommandBuilder } from "discord.js";
import { SlashCommandInterface } from "../interfaces/SlashCommand.interface";

const command:SlashCommandInterface = {
    data: new SlashCommandBuilder()
        .setName("saludo")
        .setDescription("Un buen saludo por la mañana."),
    async execute(interation) {
        await interation.reply(`Buenos días, ${interation.user.username}!`);
    },
}

export default command;
