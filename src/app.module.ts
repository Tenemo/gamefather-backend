import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { BoardGamesModule } from './board-games/board-games.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'gf-db',
            models: [],
        }),
        UsersModule,
        EventsModule,
        BoardGamesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
