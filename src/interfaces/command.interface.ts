import { Message } from "discord.js";

export interface CommandInterface {
    description:string;
    run: (message: Message<boolean>) => Promise<Message<boolean>|void>;
}
