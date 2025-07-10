import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarcacaoService } from '../../services/marcacao.service';
import { UtenteService } from '../../services/utente.service';
import { AtoClinico, AtoClinicoDisponivel, PedidoMarcacao, Utente } from '../../models';

@Component({
  selector: 'app-page-naoregistrado-utente',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './page-naoregistrado-utente.html',
  styleUrl: './page-naoregistrado-utente.css'
})

export class PageNaoregistradoUtente implements OnInit {
  
  // Formulário principal
  formularioPrincipal: FormGroup;
  
  // Carrinho de atos clínicos com ID temporário
  carrinhoAtosClinico: (AtoClinico & { id: string })[] = [];
  
  // Estados da aplicação
  isLoading = false;
  mostrarSucesso = false;
  mensagemErro = '';
  
  // Dados carregados da API
  atosDisponiveis: AtoClinicoDisponivel[] = [];
  subsistemas: string[] = [];
  horarios: string[] = [];

  generos = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
    { value: 'O', label: 'Outro' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private marcacaoService: MarcacaoService,
    private utenteService: UtenteService
  ) {
    this.formularioPrincipal = this.fb.group({
      // Dados Pessoais
      dadosPessoais: this.fb.group({
        numeroUtente: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        nomeCompleto: ['', [Validators.required, Validators.minLength(2)]],
        dataNascimento: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        telemovel: ['', [Validators.required, Validators.pattern(/^[9][1-579]\d{7}$/)]],
        email: ['', [Validators.required, Validators.email]],
        morada: ['', [Validators.required, Validators.minLength(10)]],
        fotografia: [null, [Validators.required]]
      }),
      
      // Ato Clínico (para adicionar ao carrinho)
      novoAtoClinico: this.fb.group({
        tipoAto: ['', [Validators.required]],
        subSistema: ['', [Validators.required]],
        profissional: ['']
      }),
      
      // Preferências de Agendamento
      preferencias: this.fb.group({
        dataInicio: ['', [Validators.required]],
        dataFim: ['', [Validators.required]],
        horarioPreferencial: ['', [Validators.required]],
        observacoes: ['']
      })
    });
  }

  ngOnInit(): void {
    this.limparMensagens();
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    // Carregar dados da API
    this.marcacaoService.obterAtosClinicosDisponiveis().subscribe(
      atos => this.atosDisponiveis = atos
    );
    
    this.marcacaoService.obterSubsistemas().subscribe(
      subsistemas => this.subsistemas = subsistemas
    );
    
    this.marcacaoService.obterHorarios().subscribe(
      horarios => this.horarios = horarios
    );
  }

  // Getters para facilitar acesso aos form controls
  get dadosPessoais() { return this.formularioPrincipal.get('dadosPessoais') as FormGroup; }
  get novoAtoClinico() { return this.formularioPrincipal.get('novoAtoClinico') as FormGroup; }
  get preferencias() { return this.formularioPrincipal.get('preferencias') as FormGroup; }

  // Manipulação de arquivos (fotografia)
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!tiposPermitidos.includes(file.type)) {
        this.mostrarErro('Formato de imagem não suportado. Use JPEG, PNG ou JPG.');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.mostrarErro('A imagem deve ter no máximo 5MB.');
        return;
      }
      
      this.dadosPessoais.patchValue({ fotografia: file });
    }
  }

  // Obter opções para tipo de ato
  getOpcoesAto(): AtoClinicoDisponivel[] {
    return this.atosDisponiveis;
  }

  // Adicionar ato clínico ao carrinho
  adicionarAtoClinico(): void {
    if (this.novoAtoClinico.valid) {
      const tipoAto = this.novoAtoClinico.get('tipoAto')?.value;
      const subSistema = this.novoAtoClinico.get('subSistema')?.value;
      const profissional = this.novoAtoClinico.get('profissional')?.value || '';

      // Encontrar ato selecionado
      const atoDisponivel = this.atosDisponiveis.find(a => a.id.toString() === tipoAto);
      
      if (!atoDisponivel) {
        this.mostrarErro('Ato clínico selecionado não encontrado.');
        return;
      }

      const novoAto: AtoClinico & { id: string } = {
        id: Date.now().toString(),
        tipo: atoDisponivel.tipo,
        subSistema: subSistema,
        profissional: profissional
      };

      this.carrinhoAtosClinico.push(novoAto);
      this.novoAtoClinico.reset();
      this.limparMensagens();
      
      // Mostrar mensagem de sucesso temporária
      this.mostrarSucesso = true;
      setTimeout(() => { this.mostrarSucesso = false; }, 3000);
    } else {
      this.mostrarErro('Por favor, preencha todos os campos obrigatórios do ato clínico.');
    }
  }

  // Remover ato clínico do carrinho
  removerAtoClinico(id: string): void {
    this.carrinhoAtosClinico = this.carrinhoAtosClinico.filter(ato => ato.id !== id);
  }

  // Validar datas
  validarDatas(): boolean {
    const dataInicio = new Date(this.preferencias.get('dataInicio')?.value);
    const dataFim = new Date(this.preferencias.get('dataFim')?.value);
    const hoje = new Date();

    if (dataInicio < hoje) {
      this.mostrarErro('A data de início não pode ser anterior à data atual.');
      return false;
    }

    if (dataFim < dataInicio) {
      this.mostrarErro('A data de fim não pode ser anterior à data de início.');
      return false;
    }

    return true;
  }

  // Submeter pedido
  submeterPedido(): void {
    this.limparMensagens();

    // Validar dados pessoais
    if (!this.dadosPessoais.valid) {
      this.mostrarErro('Por favor, preencha todos os dados pessoais obrigatórios.');
      return;
    }

    // Validar carrinho de atos clínicos
    if (this.carrinhoAtosClinico.length === 0) {
      this.mostrarErro('Deve adicionar pelo menos um ato clínico ao seu pedido.');
      return;
    }

    // Validar preferências
    if (!this.preferencias.valid) {
      this.mostrarErro('Por favor, preencha as preferências de agendamento.');
      return;
    }

    // Validar datas
    if (!this.validarDatas()) {
      return;
    }

    // Enviar pedido através do serviço
    this.isLoading = true;
    
    const dadosPessoais = this.dadosPessoais.value;
    const preferencias = this.preferencias.value;
    
    // Converter atos do carrinho para o formato da API
    const atos: AtoClinico[] = this.carrinhoAtosClinico.map(ato => ({
      tipo: ato.tipo,
      subSistema: ato.subSistema,
      profissional: ato.profissional
    }));

    const pedido: Omit<PedidoMarcacao, 'id' | 'dataSubmissao' | 'estado'> = {
      utenteId: 0, // Utente anônimo
      utenteTempData: {
        nome: dadosPessoais.nomeCompleto,
        email: dadosPessoais.email,
        telefone: dadosPessoais.telemovel,
        morada: dadosPessoais.morada,
        dataNascimento: dadosPessoais.dataNascimento,
        genero: dadosPessoais.genero,
        numeroUtente: dadosPessoais.numeroUtente,
        fotografia: '', // TODO: Upload da fotografia
        role: 'anonimo' as const
      },
      atos: atos,
      intervaloDatas: `${preferencias.dataInicio} a ${preferencias.dataFim}`,
      horarioPreferido: preferencias.horarioPreferencial,
      observacoes: preferencias.observacoes || ''
    };

    this.marcacaoService.criarPedidoMarcacao(pedido).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.mostrarSucesso = true;
        
        console.log('Pedido criado com sucesso:', response);
        
        // Limpar formulário após sucesso
        setTimeout(() => {
          this.formularioPrincipal.reset();
          this.carrinhoAtosClinico = [];
          this.mostrarSucesso = false;
          
          // Redirecionar para página inicial com mensagem de sucesso
          this.router.navigate(['/'], { 
            queryParams: { 
              message: 'Pedido enviado com sucesso! Será contactado em breve.' 
            } 
          });
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao criar pedido:', error);
        this.mostrarErro('Erro ao enviar pedido. Tente novamente.');
      }
    });
  }

  // Utilitários para mensagens
  mostrarErro(mensagem: string): void {
    this.mensagemErro = mensagem;
    this.mostrarSucesso = false;
  }

  limparMensagens(): void {
    this.mensagemErro = '';
    this.mostrarSucesso = false;
  }

  // Validação de campos específicos
  campoInvalido(campo: string, grupo: string = 'dadosPessoais'): boolean {
    const formGroup = this.formularioPrincipal.get(grupo) as FormGroup;
    const control = formGroup.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  obterMensagemErro(campo: string, grupo: string = 'dadosPessoais'): string {
    const formGroup = this.formularioPrincipal.get(grupo) as FormGroup;
    const control = formGroup.get(campo);
    
    if (control?.errors) {
      if (control.errors['required']) return 'Este campo é obrigatório';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['pattern']) {
        if (campo === 'numeroUtente') return 'Número de utente deve ter 9 dígitos';
        if (campo === 'telemovel') return 'Telemóvel deve começar por 9 e ter 9 dígitos';
      }
      if (control.errors['minlength']) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    
    return '';
  }
}