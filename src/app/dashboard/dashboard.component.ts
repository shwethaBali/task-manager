import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule],

})
export class DashboardComponent {
  tasks: Task[] = [];
  userRole: string | null = null;

  constructor(private router: Router, private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();

    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    this.userRole = user?.role || null;
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
