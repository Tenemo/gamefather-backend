import { Injectable, Request, HttpException, HttpStatus } from '@nestjs/common';
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

    async findAll(@Request() req: RequestWithUser) {
        return await this.eventModel.findAll({
            where: {
                ownerId: req.user.id,
            },
        });
    }

    async findOne(id: string, req: RequestWithUser) {
        const event = await this.eventModel.findOne({
            where: {
                id,
                ownerId: req.user.id,
            },
        });
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        return event;
    }

    async update(
        id: string,
        updateEventDto: UpdateEventDto,
        @Request() req: RequestWithUser,
    ) {
        const event = await this.findOne(id, req);
        console.log(event);
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        try {
            return await event.update(updateEventDto);
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not update Event',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: string, @Request() req: RequestWithUser) {
        const event = await this.findOne(id, req);
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        try {
            await event.destroy();
        } catch (e) {
            throw new HttpException(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (e.message as string) || 'Could not remove Event',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
