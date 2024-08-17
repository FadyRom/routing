import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // private activatedRoute = inject(ActivatedRoute);
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  // order?: 'asc' | 'desc';
  private tasksService = inject(TasksService);

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        }
        return a.id > b.id ? 1 : -1;
      })
  );

  // get userTasks() {
  //   return this.tasksService.allTasks().filter((task) => {
  //     return task.userId === this.userId();
  //   });
  // }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe({
    //   next: (params) => (this.order = params['order']),
    // });
    // also unsubscribe
  }

  // ngOnChanges() {
  //   console.log(this.activatedRoute.snapshot.params);
  // }
}
