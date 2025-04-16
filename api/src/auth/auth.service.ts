import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtUtilsService } from 'src/auth/utils/jwt.utils';

import { UserService } from '@/user/services/user.service';

import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtUtilsService: JwtUtilsService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto): Promise<
    | string
    | {
        access_token: string;
        refresh_token: string;
      }
  > {
    const user = await this.userService.getOneUserWithPassword({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Password incorrect');

    const accessToken = this.jwtUtilsService.generateToken(user);
    const refreshToken = this.jwtUtilsService.generateRefreshToken(user);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  verifyToken(token: string): any {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    try {
      return this.jwtUtilsService.verifyToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const decoded = this.jwtUtilsService.verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.findOne(decoded.sub);

    const accessToken = this.jwtUtilsService.generateToken(user);

    return { access_token: accessToken };
  }
}
