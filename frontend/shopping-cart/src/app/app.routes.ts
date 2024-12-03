import { Routes } from '@angular/router';
import { MallComponent } from './components/home/mall.component';
import { MainComponent } from './components/main/main.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CmsComponent } from './components/cms/cms.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'mall',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'mall',
                component: MallComponent
            },
            {
                path: 'cms',
                component: CmsComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]