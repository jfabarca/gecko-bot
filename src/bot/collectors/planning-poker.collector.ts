import {
  Filter,
  InjectCollector,
  On,
  Once,
  ReactionEventCollector,
} from '@discord-nestjs/core';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { Message, MessageReaction, ReactionCollector, User } from 'discord.js';

@Injectable({ scope: Scope.REQUEST })
@ReactionEventCollector({ time: 30000 })
export class PlanningPokerCollector {
  private readonly logger = new Logger(PlanningPokerCollector.name);

  constructor(
    @InjectCollector() private readonly collector: ReactionCollector,
  ) {}

  @Filter()
  isLikeFromAuthor(reaction: MessageReaction, user: User) {
    return (
      reaction.emoji.name === '👍' && user.id === reaction.message.author.id
    );
  }

  @On('collect')
  onCollect(reaction: MessageReaction, user: User) {
    this.logger.log(reaction.emoji.name);
    this.logger.log(user.id);
    this.logger.log('collect');
  }

  @Once('end')
  onEnd() {
    this.logger.log('end');
  }
}
