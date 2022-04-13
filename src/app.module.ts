import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Intents } from 'discord.js';

import { BotModule } from './bot';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TOKEN'),
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        },
        // registerCommandOptions: [
        //   {
        //     forGuild: configService.get('GUILD_ID_WITH_COMMANDS'),
        //     // removeCommandsBefore: true,
        //   },
        // ],
        // slashCommandsPermissions: [
        //   {
        //     commandClassType: PlaylistCommand,
        //     permissions: [
        //       {
        //         id: configService.get('ROLE_WITHOUT_PLAYLIST_PERMISSION'),
        //         type: ApplicationCommandPermissionTypes.ROLE,
        //         permission: false,
        //       },
        //     ],
        //   },
        // ],
      }),
    }),
    BotModule,
  ],
})
export class AppModule {}
