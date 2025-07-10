export interface AtoClinico {
  tipo: string;
  subSistema: string;
  profissional?: string;
}

export interface AtoClinicoDisponivel {
  id: number;
  tipo: string;
  duracao: number;
  preco: number;
  profissionais: string[];
}