import { Component } from '@angular/core';

@Component({
  selector: 'app-component-countertop',
  imports: [],
  templateUrl: './component-countertop.html',
  styleUrl: './component-countertop.css'
})
export class ComponentCountertop {
  
  items = [
    { valor: 0,    classe: 'text-warning', texto: 'Pedidos Pendentes' },
    { valor: 0,    classe: 'text-success', texto: 'Agendamentos Confirmados' },
    { valor: 0,   classe: 'text-primary', texto: 'Total de Pedidos' },
    { valor: 10, classe: 'text-info',    texto: 'Taxa de Satisfação' }
  ];


}
