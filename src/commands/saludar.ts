import { CommandInterface } from "../interfaces/command.interface";

const command:CommandInterface={
    description:'Saluda a un usuario',
    async run(message) {
        message.reply('Hola! ¿Cómo estás?');
    },
}

export default command;