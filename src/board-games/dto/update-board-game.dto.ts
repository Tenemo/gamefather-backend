import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardGameDto } from './create-board-game.dto';

export class UpdateBoardGameDto extends PartialType(CreateBoardGameDto) {}
