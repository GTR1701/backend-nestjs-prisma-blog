import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersParams } from './UserTypes/UsersParams';
import { UpdateUserParams } from './UserTypes/UpdateUserParams';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput
        })
    }

    async users(params: UsersParams): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.user.findMany({
            skip, take, cursor, where, orderBy
        })
    }

    async createUser(data: Prisma.UserCreateInput): Promise<string> {
        const password = hashSync(data.password, 10)
        const payload = {
            ...data,
            password
        }

        try {
            await this.prisma.user.create({ data: payload })
            return 'User created successfully'
        } catch {
            throw new BadRequestException('User already exists')
        }
    }

    async updateUser(params: UpdateUserParams): Promise<string> {
        const { where, data } = params
        try {
            await this.prisma.user.update({
                data, where
            })
            return 'User updated successfully'
        } catch {
            throw new BadRequestException()
        }
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<string> {
        try {
            await this.prisma.user.delete({
                where
            })
            return 'User deleted successfully'
        } catch {
            throw new BadRequestException()
        }
    }
}
