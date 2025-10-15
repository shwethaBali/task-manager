import { Injectable } from '@angular/core';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private storageKey = 'tasks';

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = task;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
}
