import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsParams } from './PostTypes/PostsParams';
import { UpdatePostParams } from './PostTypes/UpdatePostParams';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) { }

    async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput
        })
    }

    async posts(params: PostsParams): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.post.findMany({
            skip, take, cursor, where, orderBy
        })
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data
        })
    }

    async updatePost(params: UpdatePostParams): Promise<Post> {
        const { where, data } = params
        return this.prisma.post.update({
            data, where
        })
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where
        })
    }
}
