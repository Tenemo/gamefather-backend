import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[]) => any;
}
async function bootstrap(): Promise<void> {
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.setGlobalPrefix('api');
        app.enableCors();
        app.useGlobalPipes(new ValidationPipe());
        await app.listen(4000);
    }
    bootstrap();
}
bootstrap();
