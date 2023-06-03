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
    findAll(@Req() req: RequestWithUser) {
        return this.eventsService.findAll(req);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.eventsService.findOne(id, req);
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
