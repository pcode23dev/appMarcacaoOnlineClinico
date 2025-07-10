import { Routes } from '@angular/router';
import { PageLogin } from './pages/page-login/page-login';
import { PageHome } from './pages/page-home/page-home';
import { PageDashboardAdmin } from './pages/page-dashboard-admin/page-dashboard-admin';
import { PageDashboardUser } from './pages/page-dashboard-user/page-dashboard-user';
import { PageNaoregistradoUtente } from './pages/page-naoregistrado-utente/page-naoregistrado-utente';
import { AuthGuard, RoleGuard } from './guards';

export const routes: Routes = [
    {
        path: '',
        component: PageHome
    },
    {
        path: 'login',
        component: PageLogin
    },
    {
        path: 'marcacao-anonima',
        component: PageNaoregistradoUtente
    },
    {
        path: 'dashboard-utente',
        component: PageDashboardUser,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['utente'] }
    },
    {
        path: 'dashboard-admin',
        component: PageDashboardAdmin,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['administrativo'] }
    },
    {
        path: 'admin-panel',
        component: PageDashboardAdmin, // Temporário - reutilizando o mesmo componente
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
    },
    // Rotas de redirecionamento para compatibilidade
    {
        path: 'admin',
        redirectTo: 'dashboard-admin',
        pathMatch: 'full'
    },
    {
        path: 'utentenaoregistrado',
        redirectTo: 'marcacao-anonima',
        pathMatch: 'full'
    },
    // Rota padrão para páginas não encontradas
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
