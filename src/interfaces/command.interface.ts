import { ChatSession, GenerativeModel } from "@google/generative-ai";
import { Message } from "discord.js";
interface Share{
    modelAI?:GenerativeModel
    chatAI?:ChatSession
}
export interface CommandInterface {
    description:string;
    run: (message: Message<boolean>,share?:Share) => Promise<Message<boolean>|void>;
}
