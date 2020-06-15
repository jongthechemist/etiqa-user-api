import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserDto, UserCreateDto, UserListDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserList(): Promise<UserListDto[]> {
    const result = await this.userService.getAll();
    return result.map(user => ({ uuid: user.uuid, username: user.username }));
  }

  @Get(':id')
  async getUserDetails(@Param('id') userId: string): Promise<UserDto> {
    return this.userService.get(userId);
  }

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserDto> {
    return this.userService.create(body);
  }

  @Put(':id')
  async editUser(@Param('id') userId: string, @Body() body: UserCreateDto): Promise<UserDto> {
    const response = this.userService.edit(userId, body);
    return this.userService.get(userId);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string): Promise<{ success: boolean }> {
    const result = await this.userService.delete(userId);
    return { success: result };
  }
}
