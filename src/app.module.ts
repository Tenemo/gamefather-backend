import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { BoardGamesModule } from './board-games/board-games.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.model';
import { BoardGame } from './board-games/board-game.model';
import { Event } from './events/event.model';
import { EventBoardGames } from './events/event-board-games.model';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'gf-db',
            models: [User, BoardGame, Event, EventBoardGames],
        }),
        UsersModule,
        EventsModule,
        BoardGamesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
