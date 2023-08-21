import colors from 'colors';
import { Client } from "whatsapp-web.js";

colors.enable();

export function startMessagesLog(client:Client){  

    client.on('message', message => {
        console.log(
             `[${new Date().toLocaleTimeString()}] `.blue +
             `${message.from}: `.white +
             `[${ message.body}] `.white +
             `enviado de: `.blue + 
             `${message.deviceType}`.white
             );
    });

    console.log('----- [ LOG MENSAGENS OK ] -----'.gray.bold);
}