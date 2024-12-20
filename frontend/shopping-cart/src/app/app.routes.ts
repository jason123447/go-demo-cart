import { Routes } from '@angular/router';
import { MallComponent } from './components/mall/mall.component';
import { MainComponent } from './components/main/main.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CmsComponent } from './components/cms/cms.component';
import { OrdersComponent } from './components/orders/orders.component';

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
                path: 'orders',
                component: OrdersComponent
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
    },
    {
        path: '**',
        redirectTo: 'login',
    }
]