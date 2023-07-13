import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
// Bundles up controllers and providers
// A decorator
@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.4uhxiz2.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`,
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    PostsModule,
  ],
  // Similar to express controllers - control how incoming requests are handled and the sending of responses
  controllers: [AppController],
  // Extra services/classes injected into controllers/other providers to provide certain functionality i.e reaching out to a db to fetch data. Helps reduce code length of controllers
  providers: [AppService],
})
export class AppModule {}
