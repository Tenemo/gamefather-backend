import { Module } from '@nestjs/common';
import { BoardGamesService } from './board-games.service';
import { BoardGamesController } from './board-games.controller';

import { User } from '../users/user.model';
import { Event } from '../events/event.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardGame } from './board-game.model';
@Module({
    imports: [SequelizeModule.forFeature([User, Event, BoardGame])],
    controllers: [BoardGamesController],
    providers: [BoardGamesService],
    exports: [BoardGamesService],
})
export class BoardGamesModule {}
