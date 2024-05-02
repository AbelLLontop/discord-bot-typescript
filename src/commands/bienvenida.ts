import { ActionRowBuilder, ButtonBuilder } from "discord.js";
import { CommandInterface } from "../interfaces/command.interface";

const command: CommandInterface = {
  description: "Comando de bienvenida",
  run: async (message) => {
    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder({
        style: 3,
        label: "Hola",
        emoji: "👋",
        custom_id: "btn_evento_saludo",
      })
    );
    await message.channel.send({
      content: `Bienvenido ${message.author.username}`,
      components: [button],
    });
  },
};

export default command;
