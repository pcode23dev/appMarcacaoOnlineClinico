import { Component } from '@angular/core';

@Component({
  selector: 'app-component-filtertop',
  templateUrl: './component-filtertop.html',
  styleUrl: './component-filtertop.css'
})
export class ComponentFiltertop {
  

  // filtros variaveis
    tipoAtos = [
    { value: '', label: 'Todos os tipos' },
    { value: '0', label: 'Consulta' },
    { value: '1', label: 'Exame' },
    { value: '2', label: 'Cirurgia' }
  ];

  especialidades = [
    { value: '', label: 'Todas as especialidades' },
    { value: '0', label: 'Cardiologia' },
    { value: '1', label: 'Dermatologia' },
    { value: '2', label: 'Ortopedia' },
    { value: '3', label: 'Pediatria' }
  ];

  estados = [
    { value: '', label: 'Todos os estados' },
    { value: '0', label: 'Pendente' },
    { value: '1', label: 'Agendado' },
    { value: '2', label: 'Cancelado' }
  ];

}
