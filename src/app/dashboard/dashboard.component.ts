import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }
}
