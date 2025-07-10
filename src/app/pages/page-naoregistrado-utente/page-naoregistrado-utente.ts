import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interfaces para tipagem
interface AtoClinico {
  id: string;
  tipo: string;
  subSistema: string;
  observacoes?: string;
}

interface PreferenciasAgendamento {
  dataInicio: Date;
  dataFim: Date;
  horarioPreferencial: string;
  observacoes?: string;
}

interface PedidoMarcacao {
  dadosPessoais: any;
  atosClinico: AtoClinico[];
  preferencias: PreferenciasAgendamento;
}

@Component({
  selector: 'app-page-naoregistrado-utente',
  imports: [ReactiveFormsModule],
  templateUrl: './page-naoregistrado-utente.html',
  styleUrl: './page-naoregistrado-utente.css'
})

export class PageNaoregistradoUtente implements OnInit {
  
  // Formulário principal
  formularioPrincipal: FormGroup;
  
  // Carrinho de atos clínicos
  carrinhoAtosClinico: AtoClinico[] = [];
  
  // Estados da aplicação
  isLoading = false;
  mostrarSucesso = false;
  mensagemErro = '';
  
  // Dados para dropdowns
  tiposConsulta = [
    { value: 'medicina-geral', label: 'Medicina Geral' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'ginecologia', label: 'Ginecologia' }
  ];

  tiposExame = [
    { value: 'analises-sangue', label: 'Análises ao Sangue' },
    { value: 'radiografia', label: 'Radiografia' },
    { value: 'ecografia', label: 'Ecografia' },
    { value: 'mamografia', label: 'Mamografia' },
    { value: 'tac', label: 'TAC' },
    { value: 'ressonancia', label: 'Ressonância Magnética' }
  ];

  subSistemasSaude = [
    { value: 'sns', label: 'SNS (Serviço Nacional de Saúde)' },
    { value: 'medis', label: 'Medis' },
    { value: 'multicare', label: 'Multicare' },
    { value: 'advance-care', label: 'Advance Care' },
    { value: 'allianz', label: 'Allianz' },
    { value: 'particular', label: 'Particular' }
  ];

  horariosPreferenciais = [
    { value: 'manha', label: 'Manhã (9h-12h)' },
    { value: 'tarde', label: 'Tarde (14h-17h)' },
    { value: 'fim-tarde', label: 'Fim de Tarde (17h-19h)' },
    { value: 'indiferente', label: 'Indiferente' }
  ];

  generos = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
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
        categoriaAto: ['', [Validators.required]],
        tipoAto: ['', [Validators.required]],
        subSistema: ['', [Validators.required]],
        observacoes: ['']
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

  // Obter opções para tipo de ato baseado na categoria
  getOpcoesAto(): any[] {
    const categoria = this.novoAtoClinico.get('categoriaAto')?.value;
    return categoria === 'consulta' ? this.tiposConsulta : this.tiposExame;
  }

  // Adicionar ato clínico ao carrinho
  adicionarAtoClinico(): void {
    if (this.novoAtoClinico.valid) {
      const categoria = this.novoAtoClinico.get('categoriaAto')?.value;
      const tipoAto = this.novoAtoClinico.get('tipoAto')?.value;
      const subSistema = this.novoAtoClinico.get('subSistema')?.value;
      const observacoes = this.novoAtoClinico.get('observacoes')?.value;

      // Encontrar labels para exibição
      const opcoes = this.getOpcoesAto();
      const tipoLabel = opcoes.find(o => o.value === tipoAto)?.label || tipoAto;
      const subSistemaLabel = this.subSistemasSaude.find(s => s.value === subSistema)?.label || subSistema;

      const novoAto: AtoClinico = {
        id: Date.now().toString(),
        tipo: `${categoria.toUpperCase()}: ${tipoLabel}`,
        subSistema: subSistemaLabel,
        observacoes: observacoes
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

    // Simular envio do pedido
    this.isLoading = true;
    
    const pedido: PedidoMarcacao = {
      dadosPessoais: this.dadosPessoais.value,
      atosClinico: this.carrinhoAtosClinico,
      preferencias: this.preferencias.value
    };

    // Simular chamada à API
    setTimeout(() => {
      this.isLoading = false;
      this.mostrarSucesso = true;
      
      // Aqui faria a chamada real à API
      console.log('Pedido submetido:', pedido);
      
      // Limpar formulário após sucesso
      setTimeout(() => {
        this.formularioPrincipal.reset();
        this.carrinhoAtosClinico = [];
        this.mostrarSucesso = false;
      }, 5000);
      
    }, 2000);
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