import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  taskTitle = '';
  taskDesc = '';
  editMode = false;
  editId: number | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
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
}
