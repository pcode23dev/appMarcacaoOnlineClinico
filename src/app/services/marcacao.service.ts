import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { PedidoMarcacao, AtoClinico, AtoClinicoDisponivel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoService {
  private carrinhoSubject = new BehaviorSubject<AtoClinico[]>([]);
  public carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private apiService: ApiService) {}

  // Gestão do carrinho de atos clínicos
  adicionarAtoAoCarrinho(ato: AtoClinico): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    this.carrinhoSubject.next([...carrinhoAtual, ato]);
  }

  removerAtoDoCarrinho(index: number): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    carrinhoAtual.splice(index, 1);
    this.carrinhoSubject.next([...carrinhoAtual]);
  }

  limparCarrinho(): void {
    this.carrinhoSubject.next([]);
  }

  getCarrinho(): AtoClinico[] {
    return this.carrinhoSubject.value;
  }

  // APIs para pedidos de marcação
  criarPedidoMarcacao(pedido: Omit<PedidoMarcacao, 'id' | 'dataSubmissao' | 'estado'>): Observable<PedidoMarcacao> {
    const novoPedido = {
      ...pedido,
      estado: 'PEDIDO' as const,
      dataSubmissao: new Date().toISOString()
    };
    
    return this.apiService.post<PedidoMarcacao>('pedidosMarcacao', novoPedido)
      .pipe(
        tap(() => this.limparCarrinho())
      );
  }

  obterPedidosPorUtente(utenteId: number): Observable<PedidoMarcacao[]> {
    return this.apiService.get<PedidoMarcacao[]>(`pedidosMarcacao?utenteId=${utenteId}`);
  }

  obterTodosPedidos(): Observable<PedidoMarcacao[]> {
    return this.apiService.get<PedidoMarcacao[]>('pedidosMarcacao');
  }

  obterPedidosPendentes(): Observable<PedidoMarcacao[]> {
    return this.apiService.get<PedidoMarcacao[]>('pedidosMarcacao?estado=PEDIDO');
  }

  atualizarEstadoPedido(pedidoId: number, novoEstado: 'PEDIDO' | 'AGENDADO' | 'REALIZADO', dataAgendada?: string): Observable<PedidoMarcacao> {
    const dados: any = { estado: novoEstado };
    if (dataAgendada) {
      dados.dataAgendada = dataAgendada;
    }
    
    return this.apiService.patch<PedidoMarcacao>(`pedidosMarcacao/${pedidoId}`, dados);
  }

  // APIs para atos clínicos disponíveis
  obterAtosClinicosDisponiveis(): Observable<AtoClinicoDisponivel[]> {
    return this.apiService.get<AtoClinicoDisponivel[]>('atosClinicosDisponiveis');
  }

  obterSubsistemas(): Observable<string[]> {
    return this.apiService.get<string[]>('subsistemas');
  }

  obterHorarios(): Observable<string[]> {
    return this.apiService.get<string[]>('horarios');
  }

  // Simulação de envio de email
  simularEnvioEmail(destinatario: string, assunto: string, corpo: string): Observable<{success: boolean, message: string}> {
    // Simular delay de envio
    return new Promise<{success: boolean, message: string}>((resolve) => {
      setTimeout(() => {
        console.log(`📧 Email enviado para: ${destinatario}`);
        console.log(`📝 Assunto: ${assunto}`);
        console.log(`💬 Corpo: ${corpo}`);
        resolve({
          success: true,
          message: `Email enviado com sucesso para ${destinatario}`
        });
      }, 1000);
    }) as any;
  }

  // Filtros e busca
  filtrarPedidosPorData(pedidos: PedidoMarcacao[], dataInicio: string, dataFim: string): PedidoMarcacao[] {
    return pedidos.filter(pedido => {
      const dataPedido = new Date(pedido.dataSubmissao);
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);
      return dataPedido >= inicio && dataPedido <= fim;
    });
  }

  filtrarPedidosPorProfissional(pedidos: PedidoMarcacao[], profissional: string): PedidoMarcacao[] {
    return pedidos.filter(pedido => 
      pedido.atos.some(ato => ato.profissional?.includes(profissional))
    );
  }
}