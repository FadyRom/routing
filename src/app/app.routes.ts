import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUser,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from './tasks/new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

// we can add runGuardsAndResolvers: 'always' or 'function name', if we want to reexecute functions when something changes in the route like the query parameters

const canMatchFunction: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const getAccess = Math.random();
  if (getAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    data: {
      message: 'static data from route testing',
    },
    resolve: { userFunctionName: resolveUser },
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
    title: resolveTitle, //dynamic title
    // canMatch: [canMatchFunction], used to make the user have no access at this route
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'No Task Selected', //static title
  },
];
