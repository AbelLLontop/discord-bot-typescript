import { APIEmbed } from "discord.js";
import { CommandInterface } from "../interfaces/command.interface";
const command: CommandInterface = {
  description: "Saluda a un usuario",
  async run(message, share) {
    await message.channel.sendTyping();
    // const model = share?.modelAI!;
    // let chat = share?.chatAI!;
    const model = share?.modelAI!;
    const promp = message.content.split(" ").splice(1).join(" ");
    if (promp.length < 1){
      return await message.reply("Debes proveer un prompt valido");
    }
    const prompAbel = promp.toLowerCase();
    if(prompAbel.includes("abel")){
      return await message.reply("Abel es mi creador, no puedo hablar de el, pero puedo hablar de ti :3");
    }
    console.log(`User: ${promp}`);
    // if(share && promp=="reset"){
    //   //clean chat
    //   share!.chatAI! = model.startChat({
    //     history: [
    //       {
    //         role: "user",
    //         parts: [{ text: "Hola" }],
    //       },
    //       {
    //         role: "model",
    //         parts: [
    //           { text: "Hola, mi nombre es gemini, en que puedo ayudarte?" },
    //         ],
    //       },
    //     ],
    //     generationConfig: {
    //       maxOutputTokens: 100,
    //     },
    //   });
    //   chat = share?.chatAI!;
    //   const embed:APIEmbed = {
    //     title: "Gemini",
    //     description: "Chat reiniciado",
    //     color: 0x2ecc71,
    //   };
    //   return await message.channel.send({
    //     embeds: [embed],
    //   });
    // }

    const result = await model.generateContent(promp);
    // const result = await chat.sendMessage(promp);
    const response = await result.response;
    const text = response.text();
    const embed:APIEmbed = {
      title: "Gemini",
      description: text,
      color: 0x2ecc71,
    };
    return await message.channel.send({
      embeds: [embed],
    });
  },
};

export default command;
