import { Injectable, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';
import { EventBoardGames } from './event-board-games.model';
import { BoardGame } from '../board-games/board-game.model';
import { RequestWithUser } from '../types/types';
import { Transaction } from 'sequelize';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event)
        private eventModel: typeof Event,
        @InjectModel(EventBoardGames)
        private eventBoardGamesModel: typeof EventBoardGames,
    ) {}
    async create(
        createEventDto: CreateEventDto,
        @Request() req: RequestWithUser,
    ) {
        const ownerId = req.user.id;

        let event;
        await this.eventModel.sequelize.transaction(
            async (transaction: Transaction) => {
                event = await this.eventModel.create(
                    {
                        ...createEventDto,
                        ownerId,
                    },
                    { transaction },
                );

                const boardGames = createEventDto.boardGames.map(
                    (boardGameId) => ({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        eventId: event.id,
                        boardGameId,
                    }),
                );

                await this.eventBoardGamesModel.bulkCreate(boardGames, {
                    transaction,
                });
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        return await this.findOne(event.id, req);
    }

    async findAll(@Request() req: RequestWithUser) {
        const events = await this.eventModel.findAll({
            where: {
                ownerId: req.user.id,
            },
            include: [
                {
                    model: EventBoardGames,
                    as: 'boardGames',
                    attributes: ['boardGameId'],
                    include: [
                        {
                            model: BoardGame,
                            as: 'boardGame',
                        },
                    ],
                },
            ],
        });
        return events;
    }

    async findOne(id: string, req: RequestWithUser) {
        const event = await this.eventModel.findOne({
            where: {
                id,
                ownerId: req.user.id,
            },
            include: [
                {
                    model: EventBoardGames,
                    as: 'boardGames',
                    attributes: ['boardGameId'],
                    include: [
                        {
                            model: BoardGame,
                            as: 'boardGame',
                        },
                    ],
                },
            ],
        });
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        return event;
    }

    async update(
        id: string,
        updateEventDto: UpdateEventDto,
        @Request() req: RequestWithUser,
    ) {
        const event = await this.findOne(id, req);
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        if (event.ownerId !== req.user.id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            await this.eventModel.sequelize.transaction(
                async (transaction: Transaction) => {
                    await event.update(updateEventDto, { transaction });

                    if (updateEventDto.boardGames) {
                        // Delete the existing EventBoardGames related to the event
                        await this.eventBoardGamesModel.destroy({
                            where: { eventId: id },
                            transaction,
                        });

                        // Create new EventBoardGames with the updated boardGames array
                        const boardGames = updateEventDto.boardGames.map(
                            (boardGameId) => ({
                                eventId: event.id,
                                boardGameId,
                            }),
                        );
                        await this.eventBoardGamesModel.bulkCreate(boardGames, {
                            transaction,
                        });
                    }
                },
            );

            // Fetch and return the updated event with its related board games
            return await this.findOne(id, req);
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not update Event',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: string, @Request() req: RequestWithUser) {
        const event = await this.findOne(id, req);
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        if (event.ownerId !== req.user.id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            await event.destroy();
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not remove Event',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
