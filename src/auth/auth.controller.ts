import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './AuthTypes/UserCredentialsDto';
import { AuthGuard } from './auth.guard';
import { Public } from 'decorators/Public';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: UserCredentialsDto) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
