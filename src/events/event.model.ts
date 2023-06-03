import {
    Column,
    DataType,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { BoardGame } from '../board-games/board-game.model';

@Table
export class Event extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    ownerId: string;

    @BelongsTo(() => User, 'ownerId')
    owner: User;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateTime: Date;

    @HasMany(() => BoardGame)
    boardGames: BoardGame[];
}
