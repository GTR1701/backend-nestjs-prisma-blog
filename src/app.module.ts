import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, PostService],
})
export class AppModule {}
