import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { Post as PostModel } from '@prisma/client';
import { Public } from 'decorators/Public';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) { }

  @Public()
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postService.post({ id: Number(id) });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Public()
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true }
    })
  }

  @Public()
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString }
          },
          {
            content: { contains: searchString }
          }
        ]
      }
    })
  }

  @Post('post')
  async createDraft(@Body() postData: { title: string; content?: string; authorUsername: string }): Promise<PostModel> {
    const { title, content, authorUsername } = postData
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { username: authorUsername }
      }
    })
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({id: Number(id)})
  }

  @Post('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: {id: Number(id)},
      data: {published: true}
    })
  }

  @Public()
  @Post('user')
  async signupUser(@Body() userData: { username: string; password: string }): Promise<string> {
    return this.userService.createUser(userData)
  }
}
