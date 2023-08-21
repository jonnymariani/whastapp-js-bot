import qrcode from "qrcode-terminal";
import colors from 'colors';
import { Client } from "whatsapp-web.js";

colors.enable();

export function loadApplication(client:Client){
    console.log('----- [ CARREGAMENTO INICIADO ] -----'.gray.bold);

    client.on('qr', qr => {
        console.log('----- [ GERANDO QR CODE ] -----'.gray.bold);
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('\n');
        console.log('----- [ CLIENTE PRONTO ] -----'.red.bold);
        console.log('\n');
    });
}