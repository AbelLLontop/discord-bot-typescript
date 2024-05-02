import { CommandInterface } from "../interfaces/command.interface";

const command:CommandInterface = {
    description: "Comando de prueba",
    run: async (message) => {
        const args = message.content.split(" ").slice(1).join(" ");
        if(args.length<1) return await message.reply("Debes proveer un argumento valido");
        await message.reply(args);
    }
}

export default command;