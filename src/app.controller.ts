import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

// A decorator -  can be added to a class or method
// handles requests from "your-domain/". Cuz theres no arguments to filter the path in the decorator
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { name: string } {
    return { name: 'Max' };
  }
}
