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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../types/types';

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const formatEvent = async (event): Promise<Event> => {
    const { dataValues } = await event;
    const { boardGames } = dataValues;

    const boardGamesIds = boardGames.map(({ boardGame: { id } }) => id);

    return {
        ...dataValues,
        boardGames: boardGamesIds,
    };
};
const formatEvents = async (events): Promise<Event[]> => {
    const resolvedEvents = await events;
    return resolvedEvents.map(({ dataValues }) => {
        const { boardGames } = dataValues;
        const boardGamesIds = boardGames.map(({ boardGame: { id } }) => id);

        return {
            ...dataValues,
            boardGames: boardGamesIds,
        };
    });
};
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-return */

@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(
        @Body() createEventDto: CreateEventDto,
        @Req() req: RequestWithUser,
    ) {
        return this.eventsService.create(createEventDto, req);
    }

    @Get()
    async findAll(@Req() req: RequestWithUser) {
        return await formatEvents(this.eventsService.findAll(req));
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
        return await formatEvent(this.eventsService.findOne(id, req));
    }

    @Put(':id')
    replace(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
        @Req() req: RequestWithUser,
    ) {
        return this.eventsService.update(id, updateEventDto, req);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.eventsService.remove(id, req);
    }
}
