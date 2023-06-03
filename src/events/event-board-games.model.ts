import {
    Column,
    DataType,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Event } from '../events/event.model';
import { BoardGame } from '../board-games/board-game.model';

@Table
export class EventBoardGames extends Model {
    @ForeignKey(() => Event)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    eventId: string;

    @ForeignKey(() => BoardGame)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    boardGameId: string;
}
