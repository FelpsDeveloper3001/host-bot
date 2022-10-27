import { TextChannel, EmbedBuilder } from "discord.js";

interface Upload {
  data: any;
  channel: TextChannel;
  progress: number;
  message: any;
}
export function uploadMessage(data: Upload) {
  let message = "";
  if (data.progress == 1) {
    message = "Conectado com sucesso ao node";
  } else if ((data.progress = 2)) {
    message = "Arquivos configurados com sucesso";
  }
  data.message.edit({
    content: message,
  });
}
