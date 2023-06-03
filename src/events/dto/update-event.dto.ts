import { IsNotEmpty, IsISO8601, IsUUID } from 'class-validator';
export class UpdateEventDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsISO8601()
    datetime: string;

    @IsUUID(4, { each: true })
    boardGames: string[];
}
