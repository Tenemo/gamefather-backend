import { Module } from '@nestjs/common';
import { BoardGamesService } from './board-games.service';
import { BoardGamesController } from './board-games.controller';

@Module({
    controllers: [BoardGamesController],
    providers: [BoardGamesService],
})
export class BoardGamesModule {}
