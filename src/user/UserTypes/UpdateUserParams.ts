import { Prisma } from "@prisma/client"

export class UpdateUserParams {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
}