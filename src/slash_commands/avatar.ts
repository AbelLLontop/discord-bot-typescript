import { EmbedBuilder, ImageURLOptions, SlashCommandBuilder } from "discord.js";
import { SlashCommandInterface } from "../interfaces/SlashCommand.interface";

const command: SlashCommandInterface = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Enseña tu avatar de discord")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Usuario cuyo avatar quieres mostrar.")
    ),
  async execute(interaction) {
    const { user, client, guild } = interaction;// persona que escribe, bot, servidor
    const imageProperties: ImageURLOptions = { size: 1024 };

    const target = interaction.options.getUser("user") || user;
    const member = await guild?.members.fetch(target.id)!;

    const avatar =
      member.avatarURL(imageProperties) ||
      member.user.avatarURL(imageProperties);
    if (!avatar)
      return await interaction.reply(
        "No se pudo obtener el avatar del usuario."
      );

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Pedido por ${user.username}`,
        iconURL: user.avatarURL()!,
      })
      .setTitle(`Avatar de ${target.username}`)
      .setColor("Aqua")
      .setImage(avatar)
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL()!,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};

export default command;
