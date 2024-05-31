import { Injectable } from '@nestjs/common';

export interface User {
    id: number;
    username: string;
    fullname: string;
    role: string;
    project: [];
    activeYn: string;
}

@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    getUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User {
        return this.users.find(user => user.id === Number(id));
    }

    getUserByUsername(username: string): User {
        return this.users.find(user => user.username === String(username));
    }

    createUser(user: Omit<User, 'id'>): User {
        // Check if username already exists
        const existingUser = this.users.find(u => u.username === user.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Check for required fields
        if (!user.username || !user.fullname || !user.role || !user.project) {
            throw new Error('All fields are required');
        }

        const newUser: User = { id: this.idCounter++, ...user };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, user: Partial<User>): User {
        const existingUser = this.users.find(u => u.id === Number(id));
        if (existingUser) {
            Object.assign(existingUser, user);
            return existingUser;
        }
        return null;
    }

    removeUser(id: number): string {
        const index = this.users.findIndex(user => user.id === Number(id));
        if (index !== -1) {
            this.users.splice(index, 1);
            return `User with ID ${id} deleted successfully`;
        }
        return `User with ID ${id} not found`;
    }
}