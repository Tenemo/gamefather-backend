import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { BoardGamesService } from './board-games.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { AuthGuard } from '../auth/auth.guard';

import { RequestWithUser } from '../types/types';
@UseGuards(AuthGuard)
@Controller('board-games')
export class BoardGamesController {
    constructor(private readonly boardGamesService: BoardGamesService) {}

    @Post()
    async create(
        @Body() createBoardGameDto: CreateBoardGameDto,
        @Req() req: RequestWithUser,
    ) {
        return await this.boardGamesService.create(createBoardGameDto, req);
    }

    @Get()
    findAll(@Req() req: RequestWithUser) {
        return this.boardGamesService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.boardGamesService.findOne(id, req);
    }

    @Put(':id')
    replace(
        @Param('id') id: string,
        @Body() updateBoardGameDto: UpdateBoardGameDto,
        @Req() req: RequestWithUser,
    ) {
        return this.boardGamesService.update(id, updateBoardGameDto, req);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.boardGamesService.remove(id, req);
    }
}
