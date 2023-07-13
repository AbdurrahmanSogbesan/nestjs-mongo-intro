import { Injectable } from '@nestjs/common';

// Services hold the heavy logic that has nothing to do with requests and responses

// A decorator making sure the class can be injected
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
