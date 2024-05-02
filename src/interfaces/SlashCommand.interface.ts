import { ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";

export interface SlashCommandInterface {
    data:Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute:(interaction:ChatInputCommandInteraction)=>Promise<void|InteractionResponse>
}
