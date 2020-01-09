import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { sign, verify } from 'jsonwebtoken';

// generate id bao gồm 32 ký tự
const uuidv4 = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
@Injectable()
export class UserService {
  // tạo mảng user ban đầu
  private userList: any[] = [{id: '1', username: 'a', password: '123'}, {id: '2', username: 'b', password: '123'}];
  private async generateToken(user): Promise<any> {
    return sign(user, '12345')
}
  // tìm user theo id
  async getUserById(userID: string) {
    return this.userList.find(u => u.id === userID);
  }

  // show all users
  async getAllUsers() {
    return [...this.userList];
  }

  // tạo 1 user
  async create(username, password): Promise<any> {
    const newUser = {
      id: uuidv4(),
      username,
      password,
    };
    this.userList.push(newUser);
    return newUser;
  }
   // xóa 1 user
   async deleteUser(UserId: string) {
    for (let i = 0; i < this.userList.length; i++) {
      if (UserId === this.userList[i].id) {
        this.userList.splice(i, 1);
        return UserId;
      }
    }
  }
  async login(username, password){
    for (let i = 0; i < this.userList.length; i++) {
        if(username === this.userList[i].username && password === this.userList[i].password){
            const user = {
                username,
                password
            }
            const token = this.generateToken(user)
            return token
        }
    }
    return null
}
}
