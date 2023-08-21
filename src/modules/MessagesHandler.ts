import { Client, MessageMedia } from "whatsapp-web.js";
import { ChatGPTHandler } from "./chatGptHandler";
import colors from 'colors';

colors.enable();

export function StartListeningMessages(client: Client) {
    
    console.log('----- [ OUVINDO MENSAGENS ] -----'.gray.bold);

    client.on('message', async message => {

        await client.sendSeen(message.from);

        const gptHandler = new ChatGPTHandler();

        if(message.body.startsWith('!imagem')){
            client.sendMessage(message.from, "Só um instante...");

            gptHandler.getDalleResponse(message.body, 1).then(res => {
                
                MessageMedia.fromUrl(res).then(media => {                    
                    client.sendMessage(message.from, media);
                    
                    console.log(`[${new Date().toLocaleTimeString()}] Resposta Enviada: `.blue + `[${res}]`);            
                });                
            });
        }
        else{
            gptHandler.getDavinciResponse(message.body, 0.5).then(res => {
            
                const messages = res.split("\n").filter(x => x.length > 1);
    
                messages.forEach(function(m){
                    client.sendMessage(message.from, m);
                });
                
                console.log(`[${new Date().toLocaleTimeString()}] Resposta Original: `.blue + `[${res.split("\n").join(", ")}]`);
                console.log(`[${new Date().toLocaleTimeString()}] Resposta Enviada: `.blue + `[${messages.join(", ")}]`);
                
            });
        }

    });
}