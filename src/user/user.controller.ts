import { Controller, Get, Post, Put, Delete, Param, Body, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService, User } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(): User[] {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: number): User {
        return this.usersService.getUser(Number(id));
    }
    @Get('username/:username') // For getting user by username
    getUserByUsername(@Param('username') username: string): User {
        return this.usersService.getUserByUsername(String(username));
    }


    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() user: Omit<User, 'id'>): User {
        return this.usersService.createUser(user);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() user: Partial<User>): User {
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(':id')
    removeUser(@Param('id') id: number): string {
        return this.usersService.removeUser(Number(id));
    }
}