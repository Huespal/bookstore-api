import {
  Body, Controller, Get, Post, Request, UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { SignInDto } from 'src/auth/dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  signIn(@Body() { username, password }: SignInDto) {
    return this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  refreshTokens(@Request() req, @Body() { refreshToken }: RefreshTokenDto) {
    const userId = req.user['sub'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}