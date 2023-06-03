import { Injectable, Request, HttpException, HttpStatus } from '@nestjs/common';
import { BoardGame } from './board-game.model';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { InjectModel } from '@nestjs/sequelize';

import { RequestWithUser } from '../types/types';

@Injectable()
export class BoardGamesService {
    constructor(
        @InjectModel(BoardGame)
        private boardGameModel: typeof BoardGame,
    ) {}

    async create(
        createBoardGameDto: CreateBoardGameDto,
        @Request() req: RequestWithUser,
    ) {
        const ownerId = req.user.id;
        const boardGame = new this.boardGameModel({
            ...createBoardGameDto,
            ownerId,
        });
        return await boardGame.save();
    }

    async findAll(@Request() req: RequestWithUser) {
        return await this.boardGameModel.findAll({
            where: {
                ownerId: req.user.id,
            },
        });
    }

    async findOne(id: string, req: RequestWithUser) {
        const boardGame = await this.boardGameModel.findOne({
            where: {
                id,
                ownerId: req.user.id,
            },
        });
        if (!boardGame) {
            throw new HttpException(
                'Board game not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return boardGame;
    }

    async update(
        id: string,
        updateBoardGameDto: UpdateBoardGameDto,
        @Request() req: RequestWithUser,
    ) {
        const boardGame = await this.findOne(id, req);
        if (!boardGame) {
            throw new HttpException(
                'Board game not found',
                HttpStatus.NOT_FOUND,
            );
        }
        if (boardGame.ownerId !== req.user.id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            return await boardGame.update(updateBoardGameDto);
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not update BoardGame',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: string, @Request() req: RequestWithUser) {
        const boardGame = await this.findOne(id, req);
        if (!boardGame) {
            throw new HttpException(
                'Board game not found',
                HttpStatus.NOT_FOUND,
            );
        }
        if (boardGame.ownerId !== req.user.id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            await boardGame.destroy();
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not remove BoardGame',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
