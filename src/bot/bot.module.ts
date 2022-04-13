import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { EchoCommand } from './commands';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, EchoCommand],
})
export class BotModule {}
