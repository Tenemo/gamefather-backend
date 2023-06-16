import {
    Column,
    DataType,
    Model,
    Table,
    Unique,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
} from 'sequelize-typescript';
import { Event } from '../events/event.model';
import { BoardGame } from '../board-games/board-game.model';

@Table({ tableName: 'EventBoardGames' })
export class EventBoardGames extends Model {
    @PrimaryKey
    @Unique('EventBoardGameConstraint')
    @ForeignKey(() => Event)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    eventId: string;

    @BelongsTo(() => Event, { as: 'event', foreignKey: 'eventId' })
    event: Event;

    @PrimaryKey
    @Unique('EventBoardGameConstraint')
    @ForeignKey(() => BoardGame)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    boardGameId: string;

    @BelongsTo(() => BoardGame, { as: 'boardGame', foreignKey: 'boardGameId' })
    boardGame: BoardGame;
}
