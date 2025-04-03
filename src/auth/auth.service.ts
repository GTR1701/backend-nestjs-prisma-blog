import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.user({ username })

        if (!user) throw new UnauthorizedException()

        if (compareSync(user?.password, pass)) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, username: user.username }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
