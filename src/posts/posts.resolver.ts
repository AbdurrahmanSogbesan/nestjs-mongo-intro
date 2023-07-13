import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AddCommentInput } from 'src/graphql';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Mutation()
  createPost(@Args('title') title: string, @Args('content') content: string) {
    return this.postsService.createPost(title, content);
  }

  @Mutation()
  addComment(@Args('input') { postId, text, user }: AddCommentInput) {
    return this.postsService.addComment(postId, text, user);
  }
}
