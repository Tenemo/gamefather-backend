import { IsNotEmpty } from 'class-validator';

export class UpdateBoardGameDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
