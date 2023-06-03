import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { User } from '../users/user.model';
import { BoardGame } from '../board-games/board-game.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from '../events/event.model';

@Module({
    imports: [SequelizeModule.forFeature([User, BoardGame, Event])],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService],
})
export class EventsModule {}
