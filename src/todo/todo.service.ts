import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Todo } from './todo.entity';

// generate id 32 ký tự
const uuidv4 = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
@Injectable()
export class TodoService {
  // khởi tạo mảng todo ban đầu
  private todoList: any[] = [{id: '1', name: 'nestjs'}, {id: '2', name: 'react'}];
  
  // tìm todo theo ID
  async getTodoById(TodoID: string) {
    return this.todoList.find(u => u.id === TodoID);
  }
  // show tất cả todos
  async getAllTodos() {
    return [...this.todoList];
  }
  // tạo 1 todo và thêm vào mảng ban đầu
  async createTodo(name): Promise<any> {
    const newTodo = {
      id: uuidv4(),
      name,
    };
    this.todoList.push(newTodo);
    return newTodo;
  }
  // xóa 1 todo
  async deleteTodo(TodoID: string) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (TodoID === this.todoList[i].id) {
        this.todoList.splice(i, 1);
        return TodoID;
      }
    }
  }
  // cập nhật todo
  async updateTodo(id, newName): Promise<any> {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.todoList.length; i++) {
        if (id === this.todoList[i].id) {
            this.todoList[i].name = newName;
            return {newName};
        }
    }
    return null;
}
}
