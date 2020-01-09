import { Controller, Get, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Post('userWithID')
  async getUserWithID(@Body() body) {
    const foundUser = await this.userService.getUserById(body.id);
    if (foundUser) { return foundUser; }
    return null;
  }
  @Post('createUser')
   createUser(@Body('username') username: string, @Body('password') password: string): any {
    return this.userService.create(username, password);
  }
  @Delete('deleteUser')
  async deleteUser(@Body() body ) {
    const isDelete = await this.userService.deleteUser(body.id);
    return isDelete;
  }
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string ) {
      const token = await this.userService.login(username, password);
      return token;
  }
}
