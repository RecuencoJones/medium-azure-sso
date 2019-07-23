import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { User } from './user.decorator';
import { AzureADGuard } from './aad.guard';
import { AzureUser } from './user';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Hello, world!';
  }

  @Get('me')
  @UseGuards(AzureADGuard)
  getHelloUser(@User() user: AzureUser) {
    return `Hello, ${ user.preferred_username }!`;
  }

  @Get('admin')
  @UseGuards(AzureADGuard, AdminGuard)
  getHelloAdmin() {
    return 'Hello, admin!';
  }
}
