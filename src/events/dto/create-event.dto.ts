import { IsNotEmpty, IsISO8601, IsUUID } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    name: string;

    @IsISO8601()
    datetime: string;

    @IsUUID(4, { each: true })
    boardGames: string[];
}
