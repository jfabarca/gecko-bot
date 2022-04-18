import {
  InjectDiscordClient,
  On,
  Once,
  UseCollectors,
  UseGuards,
} from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { PlanningPokerCollector } from './collectors';
import { MessageFromUserGuard } from './guards';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard)
  // @UseCollectors(PlanningPokerCollector)
  async onMessage(message: Message): Promise<void> {
    this.logger.log('onMessage');
    // await message.reply('Message processed successfully');
  }
}
