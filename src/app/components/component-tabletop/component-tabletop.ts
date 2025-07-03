import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-tabletop',
  imports: [NgClass],
  templateUrl: './component-tabletop.html',
  styleUrl: './component-tabletop.css'
})
export class ComponentTabletop {
  pedidos = [
    {
      id: 'REQ001',
      utente: 'Maria Silva',
      tipo: 'Consulta',
      especialidade: 'Cardiologia',
      dataSolicitacao: '15/01/2024',
      estado: 'Pendente',
      statusClass: 'status-pending',
      acoes: ['view', 'schedule', 'confirm']
    },
    {
      id: 'REQ002',
      utente: 'António Costa',
      tipo: 'Exame',
      especialidade: 'Dermatologia',
      dataSolicitacao: '14/01/2024',
      estado: 'Confirmado',
      statusClass: 'status-confirmed',
      acoes: ['view', 'confirm']
    },
    {
      id: 'REQ003',
      utente: 'Carla Fernandes',
      tipo: 'Consulta',
      especialidade: 'Ortopedia',
      dataSolicitacao: '13/01/2024',
      estado: 'Cancelado',
      statusClass: 'status-cancelled',
      acoes: ['view']
    },
    {
      id: 'REQ004',
      utente: 'Pedro Oliveira',
      tipo: 'Cirurgia',
      especialidade: 'Cardiologia',
      dataSolicitacao: '12/01/2024',
      estado: 'Concluído',
      statusClass: 'status-completed',
      acoes: ['view']
    },
    {
      id: 'REQ005',
      utente: 'Luísa Sousa',
      tipo: 'Consulta',
      especialidade: 'Pediatria',
      dataSolicitacao: '11/01/2024',
      estado: 'Pendente',
      statusClass: 'status-pending',
      acoes: ['view', 'schedule', 'confirm']
    },
    {
      id: 'REQ006',
      utente: 'Carlos Mendes',
      tipo: 'Exame',
      especialidade: 'Cardiologia',
      dataSolicitacao: '10/01/2024',
      estado: 'Confirmado',
      statusClass: 'status-confirmed',
      acoes: ['view', 'confirm']
    }  
  ];

   viewRequest(id: string) {
    console.log('Visualizar pedido:', id);
    // Implemente a lógica para visualizar detalhes do pedido
  }

  scheduleRequest(id: string) {
    console.log('Agendar pedido:', id);
    // Implemente a lógica para agendar o pedido
  }

  confirmRequest(id: string) {
    console.log('Confirmar pedido:', id);
    // Implemente a lógica para confirmar o pedido
  }

}
