import Eris from 'eris';
import { MessageCollector } from '../utils';
import { config } from '../config';

export class Bot {
  readonly bot: Eris.Client;
  readonly messageCollector: MessageCollector;

  constructor() {
    this.bot = new Eris.Client(config.token, {
      intents: ['guildMessages'],
    });

    this.messageCollector = new MessageCollector(this.bot);
  }

  async start(): Promise<void> {
    this.bot.on('ready', () => {
      console.log('Ready!');
    });

    this.bot.on('error', (error) => {
      console.error(error);
    });

    this.bot.on('messageCreate', async (msg) => {
      if (msg.author.bot) {
        return;
      }

      if (msg.content === '!collect') {
        this.bot.createMessage(msg.channel.id, 'Collect');

        const collectedMsg = await this.messageCollector.awaitMessage(
          msg.channel.id,
          msg.author.id,
          {
            timeout: 5000,
            filter: (_msg) => _msg.author.id === msg.author.id,
          }
        );

        if (collectedMsg) {
          console.log('Message collected');

          this.bot.createMessage(
            msg.channel.id,
            `Collected: ${collectedMsg.content}`
          );
        } else {
          console.log('Collector timed out');

          this.bot.createMessage(msg.channel.id, 'Collector timed out');
        }
      }
    });

    await this.bot.connect();
  }
}
