const TOKEN_BOT = process.env.TOKEN_BOT!; //token del bot
const GUILD_ID = process.env.GUILD_ID!; //id del servidor
const CLIENT_ID = process.env.CLIENT_ID!; //id de la aplicacion
const TOKEN_GEMINI = process.env.TOKEN_GEMINI!; //token de la IA
const MODEL_IA = process.env.MODEL_IA!; //modelo de la IA

if (!TOKEN_BOT || !GUILD_ID || !CLIENT_ID || !TOKEN_GEMINI || !MODEL_IA) {
  throw new Error("Falta una variable de entorno");
}
export default {
  TOKEN_BOT,
  GUILD_ID,
  CLIENT_ID,
  TOKEN_GEMINI,
  MODEL_IA,
};
