import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}