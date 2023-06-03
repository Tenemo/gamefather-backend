import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

import { RequestWithUser } from '../types/types';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event)
        private eventModel: typeof Event,
    ) {}

    async create(
        createEventDto: CreateEventDto,
        @Request() req: RequestWithUser,
    ) {
        const ownerId = req.user.id;
        const event = new this.eventModel({
            ...createEventDto,
            ownerId,
        });
        return await event.save();
    }

    async findAll() {
        return await this.eventModel.findAll();
    }

    async findOne(id: string) {
        return await this.eventModel.findByPk(id);
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        const updateEvent = await this.findOne(id);
        if (updateEvent) {
            return await updateEvent.update(updateEventDto);
        }
        return null;
    }

    async remove(id: string) {
        const removeEvent = await this.findOne(id);
        if (removeEvent) {
            return await removeEvent.destroy();
        }
        return null;
    }
}
