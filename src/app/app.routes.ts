import { Routes } from '@angular/router';
import { PageLogin } from './pages/page-login/page-login';
import { PageHome } from './pages/page-home/page-home';
import { PageDashboardAdmin } from './pages/page-dashboard-admin/page-dashboard-admin';
import { PageNaoregistradoUtente } from './pages/page-naoregistrado-utente/page-naoregistrado-utente';

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
    },
    {
        path: 'utentenaoregistrado',
        component: PageNaoregistradoUtente
    }
];
