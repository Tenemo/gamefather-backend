import { Test, TestingModule } from '@nestjs/testing';
import { BoardGamesController } from './board-games.controller';
import { BoardGamesService } from './board-games.service';

describe('BoardGamesController', () => {
    let controller: BoardGamesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardGamesController],
            providers: [BoardGamesService],
        }).compile();

        controller = module.get<BoardGamesController>(BoardGamesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
