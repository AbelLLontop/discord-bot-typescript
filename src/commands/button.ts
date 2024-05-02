import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, CollectedInteraction, Collection, CollectorFilter, Interaction, InteractionCollector, Message, MessageCollector, MessageCollectorOptions, MessageComponentInteraction } from "discord.js";
import { CommandInterface } from "../interfaces/command.interface";

const userNameButton = new ButtonBuilder()
.setCustomId("username")
.setEmoji("👤")
.setLabel("Enviar nombre de usuario")
.setStyle(1);

const avatarButton = new ButtonBuilder()
.setCustomId("avatar")
.setEmoji("🖼️")
.setLabel("Mostrar avatar de usuario")
.setStyle(2);

const command:CommandInterface={
    description: "Enviar dos botones, uno envia el nombre del usuario y el otro la imagen de perfil del usuario",
    run: async (message) => {
        const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(userNameButton,avatarButton);
        const reply = await message.reply({
            components:[actionRow]
        })

        const filter= (interaction:MessageComponentInteraction)=>interaction.user.id === message.author.id && interaction.message.id ===reply.id;
        
        const collector = message.channel.createMessageComponentCollector({
            filter
            ,time:60*1000
        })

        collector.on("collect",async(interaction)=>{
            if(interaction.customId === "username"){
                interaction.update({
                    content:`Tu nombre es **${message.author.displayName}**`,
                    components:[]
                })
            }else if(interaction.customId === "avatar"){
                const avatar = message.author.displayAvatarURL({size:512});
                interaction.update({
                    content:`Tu imagen de perfil es:`,
                    files:[avatar],
                    components:[]
                })
            }
        })
        collector.on("end",()=>{
            reply.edit({
                content:"La interacción ha terminado",
                components:[]
            
            }).catch(console.error);
        })

       
    }
}

export default command;