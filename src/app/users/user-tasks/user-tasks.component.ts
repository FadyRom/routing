import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  userFunctionName = input();
  message = input.required<string>();
  private usersService = inject(UsersService);
  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );

  // activatedRoute = inject(ActivatedRoute);
  // userName = '';
  // private destroyRef = inject(DestroyRef);
  // private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe({
    //   next: (data) => console.log(data),
    // });
    // console.log(this.message());
    //   console.log(this.activatedRoute);
    //   const sub = this.activatedRoute.paramMap.subscribe({
    //     next: (paramMap) => {
    //       this.userName =
    //         this.usersService.users.find((u) => {
    //           u.id === paramMap.get('userId');
    //         })?.name || '';
    //     },
    //   });
    //   this.destroyRef.onDestroy(() => {
    //     sub.unsubscribe();
    //   });
  }
  // ngOnChanges() {
  //   console.log(this.userFunctionName());
  // }
}

export const resolveUser: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersServices = inject(UsersService);
  const userName =
    usersServices.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersServices = inject(UsersService);
  const userName =
    usersServices.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};
