import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BoardGamesService } from './board-games.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@Controller('board-games')
export class BoardGamesController {
    constructor(private readonly boardGamesService: BoardGamesService) {}

    @Post()
    create(@Body() createBoardGameDto: CreateBoardGameDto) {
        return this.boardGamesService.create(createBoardGameDto);
    }

    @Get()
    findAll() {
        return this.boardGamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boardGamesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBoardGameDto: UpdateBoardGameDto,
    ) {
        return this.boardGamesService.update(+id, updateBoardGameDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boardGamesService.remove(+id);
    }
}
