import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]

})
export class TasksComponent {
  tasks: Task[] = [];
  userRole: string | null = null;
  taskTitle = '';
  taskDesc = '';
  editMode = false;
  editId: number | null = null;

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks = this.taskService.getTasks();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    this.userRole = user?.role || null;
  }

  addOrUpdateTask() {
    if (this.editMode && this.editId !== null) {
      this.taskService.updateTask({
        id: this.editId,
        title: this.taskTitle,
        description: this.taskDesc,
        completed: false
      });
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: this.taskTitle,
        description: this.taskDesc,
        completed: false
      };
      this.taskService.addTask(newTask);
    }
    this.resetForm();
    this.tasks = this.taskService.getTasks();
  }

  editTask(task: Task) {
    this.taskTitle = task.title;
    this.taskDesc = task.description || '';
    this.editMode = true;
    this.editId = task.id;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  resetForm() {
    this.taskTitle = '';
    this.taskDesc = '';
    this.editMode = false;
    this.editId = null;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
