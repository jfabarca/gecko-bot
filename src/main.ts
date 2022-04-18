import 'dotenv/config';
import Eris from 'eris';

import { config } from './config';

const bot = new Eris.Client(config.token, {
  intents: ['guildMessages'],
});

bot.on('ready', () => {
  console.log('Ready!');
});

bot.on('error', (error) => {
  console.error(error);
});

bot.on('messageCreate', (msg) => {
  if (msg.author.bot) {
    return;
  }

  bot.createMessage(msg.channel.id, 'Hello there');
});

bot.connect();
