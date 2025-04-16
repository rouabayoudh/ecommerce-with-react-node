import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/user/schemas/user-schema/User.schema';

import { config } from '../../config/index';

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user): string {
    const payload = {
      sub: user._id.toString(),
      roles: user.roles || [],
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      language: user.language || 'en',
    };

    return this.jwtService.sign(payload, {
      secret: config.jwt.accessSecret,
      expiresIn: config.jwt.accessTokenExpiresIn,
    });
  }

  generateRefreshToken(user): string {
    const payload = {
      sub: user._id.toString(),
    };

    return this.jwtService.sign(payload, {
      secret: config.jwt.refreshSecret,
      expiresIn: config.jwt.refreshTokenExpiresIn,
    });
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: config.jwt.refreshSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token', error);
    }
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: config.jwt.accessSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }
}
