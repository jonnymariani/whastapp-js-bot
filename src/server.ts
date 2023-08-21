import { Client, LocalAuth  } from "whatsapp-web.js";
import { startMessagesLog } from './modules/log/message-receive';
import { loadApplication } from './modules/log/load';
import { StartListeningMessages } from "./modules/MessagesHandler";

const client = new Client({
    authStrategy: new LocalAuth()
});
 
loadApplication(client);
startMessagesLog(client);
StartListeningMessages(client);

client.initialize();