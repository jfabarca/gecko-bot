import Eris from 'eris';

export interface Collector {
  filter: (msg: Eris.Message) => boolean;
  resolve: (msg: Eris.Message) => void;
}

export interface MessageCollectorOptions {
  timeout?: number;
  filter?: Collector['filter'];
}

export class MessageCollector {
  private readonly DEFAULT_TIMEOUT = 30000;
  private readonly collectors = new Map<string, Collector>();

  constructor(bot: Eris.Client) {
    bot.on('messageCreate', this.validate.bind(this));
  }

  private async validate(msg: Eris.Message): Promise<void> {
    const collector = this.getCollector(msg);

    if (collector && collector.filter(msg)) {
      collector.resolve(msg);
    }
  }

  private getMessageKey(msg: Eris.Message) {
    return msg.channel.id + msg.author.id;
  }

  private getCollector(msg: Eris.Message): Collector | undefined {
    return this.collectors.get(this.getMessageKey(msg));
  }

  private defaultFilter() {
    return true;
  }

  async awaitMessage(
    channelId: string,
    userId: string,
    options?: MessageCollectorOptions
  ): Promise<Eris.Message | undefined> {
    const timeout = options?.timeout || this.DEFAULT_TIMEOUT;
    const filter = options?.filter || this.defaultFilter;

    const key = channelId + userId;

    return new Promise((resolve) => {
      if (this.collectors.get(key)) {
        this.collectors.delete(key);
      }

      this.collectors.set(key, {
        resolve,
        filter,
      });

      setTimeout(resolve.bind(undefined, undefined), timeout);
    });
  }
}
