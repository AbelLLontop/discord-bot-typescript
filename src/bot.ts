// Requerimientos
import {
  Client,
  Events,
  REST as DiscordRest,
  Routes,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import fs from "fs";
import { SlashCommandInterface } from "./interfaces/SlashCommand.interface";
import { CommandInterface } from "./interfaces/command.interface";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import tokens from "./config/tokens";

//IA
const genAI = new GoogleGenerativeAI(tokens.TOKEN_GEMINI);
const model = genAI.getGenerativeModel({ model: tokens.MODEL_IA });
let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hola" }],
    },
    {
      role: "model",
      parts: [{ text: "Hola, mi nombre es gemini, en que puedo ayudarte?" }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 100,
  },
});


//Cliente
const client = new Client({
  intents: 3276799,
});

//Comandos
let commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

const filesCommandNames = fs.readdirSync(
  path.join(__dirname, "slash_commands")
);

const promises = filesCommandNames.map(async (file) => {
  const fileName = file.split(".")[0];
  const command: SlashCommandInterface = (
    await import(`./slash_commands/${fileName}`)
  ).default;
  commands.push(command.data.toJSON());
});

//Registrar Comandos
const REST = new DiscordRest({ version: "10" }).setToken(tokens.TOKEN_BOT);

(async () => {
  try {
    await Promise.all(promises);
    console.log(
      "Comenzo la actualizacion de los comandos de la aplicacion (/)"
    );
    await REST.put(
      Routes.applicationGuildCommands(tokens.CLIENT_ID, tokens.GUILD_ID),
      {
        body: commands,
      }
    );
    console.log(
      "Los comandos de la aplicacion (/) se han actualizado correctamente"
    );
  } catch (e) {
    console.error(e);
  }
})();

//Contenido
client.on(Events.ClientReady, async () => {
  console.log(`Bot conectado como ${client.user?.username}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!!g")) return;
  try {
    //Comandos
    const args = message.content.toLowerCase().slice(2).split(" ")[0];

    const command: CommandInterface = (await import(`./commands/${args}`))
      .default;
    command.run(message, {
      modelAI: model,
      // chatAI: chat,
    });
  } catch (e) {
    console.log(`${message.content} no es un comando valido.`);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "btn_evento_saludo") {
      await interaction.reply(`Hola, ${interaction.user.username}!`);
    }
  } else if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;
    const command = (await import(`./slash_commands/${commandName}`))
      .default as SlashCommandInterface;
    await command.execute(interaction);
  }
});

client.login(tokens.TOKEN_BOT);
