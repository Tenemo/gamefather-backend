import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: user.username,
        };
    }

    async register(createUserDto: CreateUserDto) {
        const { password, username } = createUserDto;
        if (password.length < 8) {
            throw new BadRequestException(
                'Password must be at least 8 characters long',
            );
        }
        const userExists = await this.usersService.findByUsername(username);
        if (userExists) {
            throw new UnauthorizedException('Username is already taken');
        }

        const user = await this.usersService.create(createUserDto);
        const { id } = user;
        const payload = { sub: id, username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: user.username,
        };
    }
}
