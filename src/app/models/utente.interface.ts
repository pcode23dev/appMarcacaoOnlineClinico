export interface Utente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  morada: string;
  dataNascimento: string;
  genero: string;
  numeroUtente: string;
  fotografia: string;
  role: 'anonimo' | 'utente' | 'administrativo' | 'admin';
  senha?: string;
}