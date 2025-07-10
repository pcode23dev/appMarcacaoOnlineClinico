import { AtoClinico } from './ato-clinico.interface';
import { Utente } from './utente.interface';

export interface PedidoMarcacao {
  id: number;
  utenteId: number;
  utenteTempData?: Partial<Utente>;
  atos: AtoClinico[];
  intervaloDatas: string;
  horarioPreferido: string;
  observacoes: string;
  estado: 'PEDIDO' | 'AGENDADO' | 'REALIZADO';
  dataSubmissao: string;
  dataAgendada?: string;
}