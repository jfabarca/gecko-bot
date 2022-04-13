import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import { EchoDto } from '../dto/echo.dto';

@Command({
  name: 'echo',
  description: 'Sends a message to the bot',
})
@UsePipes(TransformPipe)
export class EchoCommand implements DiscordTransformedCommand<EchoDto> {
  private readonly logger = new Logger(EchoCommand.name);

  handler(
    @Payload() dto: EchoDto,
    { interaction }: TransformedCommandExecutionContext,
  ): string {
    this.logger.log('DTO', dto.message);
    this.logger.log('Interaction', interaction);

    return `${dto.message}`;
  }
}
