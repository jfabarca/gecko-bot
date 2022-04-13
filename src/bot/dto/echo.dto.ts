import { Param } from '@discord-nestjs/core';

export class EchoDto {
  @Param({
    name: 'message',
    description: 'The message you want to send to the bot.',
    required: true,
  })
  message: string;
}
