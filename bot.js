const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


// Telegram bot token
const token = 'YOUR_BOT_API';
const bot = new TelegramBot(token, { polling: true });

const logFilePath = path.join(__dirname, 'error.log');

function getProgressBar(progress) {
    const barLength = 20;
    const numBlocks = Math.round((progress / 100) * barLength);
    const progressBar = '▓'.repeat(numBlocks) + '░'.repeat(barLength - numBlocks);

    return `[${progress.toFixed(2)}%] ${progressBar}`;
}

function logError(err) {
    const errorMessage = `Error occurred: ${err}\n`;
    fs.appendFile(logFilePath, errorMessage, (error) => {
        if (error) {
            console.error('Error writing to log file:', error);
        }
    });
}

function sendWelcomeMessage(chatId) {
    const welcomeMsg = "Welcome to the File Management Bot! Send a file and I'll handle it for you.";
    bot.sendMessage(chatId, welcomeMsg);
}

// Handle the '/start' command to send the welcome message
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    sendWelcomeMessage(chatId);
});

bot.on('document', async (msg) => {
    const chatId = msg.chat.id;

    try {
        const fileId = msg.document.file_id;
        const file = await bot.getFile(fileId);
        const fileURL = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        const response = await fetch(fileURL);

        const file_size = msg.document.file_size;
        let received_bytes = 0;

	// Save the document (You can modify this logic for your specific use case)
	const filePath = path.join(__dirname, 'downloads', `${msg.document.file_name}`);
	const fileWriter = fs.createWriteStream(filePath);

	response.body.on('data', (chunk) => {
		received_bytes += chunk.length;
		const progress = (received_bytes / file_size) * 100;

		// Simulate progress bar
		const progressBar = getProgressBar(progress);
		const message = `File download progress:\n${progressBar}`;

		bot.sendMessage(chatId, message);
	});

	response.body.pipe(fileWriter);

	bot.sendMessage(chatId, `File saved successfully. Processing is in progress.`);

    } catch (err) {
		
	logError(err);
	bot.sendMessage(chatId, 'Failed to save the file. Please try again later.');
    }
});
