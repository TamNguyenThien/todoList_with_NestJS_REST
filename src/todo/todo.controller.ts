import { Controller, Get, Post, Body, Delete, Put, Patch, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }
  @Post('getTodoById')
  async getTodoById(@Body() body) {
    const foundTodo = await this.todoService.getTodoById(body.id);
    if (foundTodo) { return foundTodo; }
    return null;
  }
  @Post('createTodo')
    async createTodo(@Body('name') name: string) {
        return this.todoService.createTodo(name);
    }

    @Delete('deleteTODO')
    async deleteTodo(@Body() body ) {
        const isDelete = await this.todoService.deleteTodo(body.id);
        return isDelete;
    }
    @Patch('updateTodo')
    async updateTodo(@Body('id') id, @Body('newName') newName) {
      const isEdit = await this.todoService.updateTodo(id, newName);
      return isEdit;
    }
}
