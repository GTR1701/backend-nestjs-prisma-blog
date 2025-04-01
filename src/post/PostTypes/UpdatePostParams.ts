import { Prisma } from "@prisma/client"

export class UpdatePostParams {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUpdateInput
}