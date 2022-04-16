require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')

const { setconfs } = require('./confs.js'),
      { settexts } = require('./texts.js')

setconfs() // sets global.$conf
settexts() // sets global.$txt

// replace the value below with 
// the Telegram token you receive from @BotFather
const token = $conf.botk

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { 
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
