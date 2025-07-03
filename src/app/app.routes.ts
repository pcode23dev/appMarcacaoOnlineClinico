import { Routes } from '@angular/router';
import { PageLogin } from './pages/page-login/page-login';
import { PageHome } from './pages/page-home/page-home';
import { PageDashboardAdmin } from './pages/page-dashboard-admin/page-dashboard-admin';

export const routes: Routes = [
    {
        path: '',
        component:PageHome
    },
    {
        path:'login',
        component: PageLogin
    },
    {
        path: 'admin',
        component:PageDashboardAdmin
    }
];
