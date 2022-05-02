require('dotenv').config()
require('./settings').setup() // sets global.$c - confs, sets global.$t - texts

const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot($c.botk, { 
    polling: true 
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chat = msg.chat,
          resp = match[1];
    bot.sendMessage(chat.id, resp)
})

bot.onText(/\/start/, (msg) => {
    const chat = msg.chat
    bot.sendMessage(chat.id, "Olá, digite o código de ativação para tornar-se membro.")
})

// Listen for any kind of message. 
// There are different kinds of messages
bot.on('message', (msg) => {
    const chat = msg.chat
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chat.id, 'Received your message')
})
