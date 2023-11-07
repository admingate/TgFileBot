# TgFileBot
Telegram Node JS Bot to upload and download files


1 - First, make sure you have Node.js installed and create a new Node.js project. Then, install the node-telegram-bot-api:

```sh
npm install node-telegram-bot-api
```

2 - Install PM2:
If you haven't installed PM2 yet, do it by running:

```sh
npm install pm2 -g
```

3 - Ensure PM2 starts on boot:
To make sure PM2 starts on system boot, run the following command:

```sh
pm2 startup
```

4 - Start your bot with PM2:
Navigate to the directory where your bot script is located and start it using PM2:

```sh
pm2 start bot.js
```

5 - Managing your bot:
You can manage your bot with PM2 using commands like pm2 stop, pm2 restart, pm2 list, etc. For instance, to stop your bot:

```sh
pm2 stop bot
```

Using PM2 will ensure that your bot continues running in the background, even when you disconnect from your SSH session or restart the server. It also provides logs for easy debugging and monitoring.


