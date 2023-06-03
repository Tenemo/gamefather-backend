import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUserDto.password, salt);

        return user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ where: { id } });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findOne({ where: { id } });

        if (user) {
            user.username = updateUserDto.username || user.username;

            if (updateUserDto.password) {
                const salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash(updateUserDto.password, salt);
            }

            return user.save();
        }
    }

    async remove(id: string): Promise<void> {
        const user = await this.userModel.findOne({ where: { id } });

        if (user) {
            await user.destroy();
        }
    }
}
