import { EmbedBuilder } from "discord.js";
import { CommandInterface } from "../interfaces/command.interface";

const command: CommandInterface = {
  description: "Comando para ver el avatar de un usuario",
  run: async (message) => {
    const user = message.mentions.users.first() ||message.author;
    if(!user) return message.reply("Introduce un usuario valido");
    const avatar = user.displayAvatarURL({ size: 1024 });
    const embed = new EmbedBuilder()
    .setColor("Blurple")
    .setTitle(`Avatar de <@${user.displayName}>`)
    .setImage(avatar);
    await message.reply({ embeds: [embed] });
  },
};

export default command;