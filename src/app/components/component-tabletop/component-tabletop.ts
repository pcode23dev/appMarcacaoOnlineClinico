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
    id: '1',
    utente: 'Maria Silva',
    tipo: 'Consulta',
    especialidade: 'Cardiologia',
    dataSolicitacao: '15/01/2024',
    estado: 'Pendente',
    statusClass: 'status-pending'
  }];

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
