import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { logInterceptor, setHeaderInterceptor } from './interceptors/interceptors';
import { User } from './services/data/models.interface';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([logInterceptor, setHeaderInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        // const router = inject(Router);
        const authServ = inject(AuthService);
        let lsUser: User;
        const userStr = localStorage.getItem("user");
        if (userStr) {
          lsUser = JSON.parse(userStr);
          authServ.user = lsUser;
        }
        // return () => {};
      },
      // multi: true
    }
  ]
};
