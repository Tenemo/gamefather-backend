import { Test, TestingModule } from '@nestjs/testing';
import { BoardGamesService } from './board-games.service';

describe('BoardGamesService', () => {
    let service: BoardGamesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BoardGamesService],
        }).compile();

        service = module.get<BoardGamesService>(BoardGamesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
