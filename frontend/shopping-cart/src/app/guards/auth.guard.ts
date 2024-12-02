import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  // const ngRouter = inject(Router);
  // ngRouter.navigate(['login']);
  // console.log(authService);
  return authService.isLogin;
};
