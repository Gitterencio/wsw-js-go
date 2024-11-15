const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
var fs = require('fs');
// Create a new client instance
const client = new Client();

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('¡El cliente está listo!');
    
    // Obtener todos los chats
    const chats = await client.getChats();

    for (const [index, chat] of chats.entries()) {
        console.log(`\n${index + 1}. Chat: ${chat.name || chat.id._serialized}`);

        // Obtener los últimos 3 mensajes de cada chat
        const messages = await chat.fetchMessages({ limit: 3 });

        // Mostrar los mensajes
        messages.reverse().forEach((message, idx) => {
            console.log(message.id._serialized)
            console.log(`   ${idx + 1}. ${message.body || '(Mensaje vacío)'}`);
        });
    }
});

// When the client received QR-Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

// Start your client
client.initialize();


client.on('message_create',async message => {
	if (message.body === '!ping') {
		// reply back "pong" directly to the message
		message.reply('pong');
	}
    console.log(message)
    const media = await message.downloadMedia();

    if (media) {
        // Guardar el archivo según su tipo MIME
        const fileExtension = media.mimetype.split('/')[1]; // Obtener la extensión del archivo
        const fileName = `media_${message.id.id}.${fileExtension}`;

        fs.writeFileSync(fileName, media.data, { encoding: 'base64' });
        console.log(`Archivo guardado como: ${fileName}`);
    } else {
        console.log('No se pudo descargar el medio.');
    }
});