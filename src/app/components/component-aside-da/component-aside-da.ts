import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-component-aside-da',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './component-aside-da.html',
  styleUrl: './component-aside-da.css'
})
export class ComponentAsideDa {
  constructor() {
    // Inicialização do componente
  }

  menuItems1 = [
    { urlNome: 'Home', urlIcon: 'fas fa-calendar-alt', urlLink: '/' },
    { urlNome: 'Dashboard', urlIcon: 'fas fa-tachometer-alt', urlLink: '/admin' },
    { urlNome: 'Utentes', urlIcon: 'fas fa-users', urlLink: '/utentes' }
  ];

  menuItems2 = [
    { urlNome: 'Histórico Geral', urlIcon: 'fas fa-history', urlLink: '#' },
    { urlNome: 'Marcações', urlIcon: 'fas fa-clipboard-list', urlLink: '#' },
    { urlNome: 'Agendamentos', urlIcon: 'fas fa-clipboard-list', urlLink: '#' },
    { urlNome: 'Relatórios', urlIcon: 'fas fa-chart-bar', urlLink: '#' }
  ];

  // ...existing code...
  menuItems3 = [
    { urlNome: 'Configurações', urlIcon: 'fas fa-cog', urlLink: '#' },
    { urlNome: 'Sair', urlIcon: 'fas fa-sign-out-alt', urlLink: '/login' }
  ];
  // ...existing code...
}
