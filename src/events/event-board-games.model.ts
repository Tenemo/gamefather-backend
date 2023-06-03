import {
    Column,
    DataType,
    Model,
    Table,
    Unique,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Event } from '../events/event.model';
import { BoardGame } from '../board-games/board-game.model';

@Table
export class EventBoardGames extends Model {
    @Unique('EventBoardGameConstraint')
    @ForeignKey(() => Event)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    eventId: string;

    @BelongsTo(() => Event)
    event: Event;

    @Unique('EventBoardGameConstraint')
    @ForeignKey(() => BoardGame)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    boardGameId: string;

    @BelongsTo(() => BoardGame)
    boardGame: BoardGame;
}
