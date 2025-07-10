# 🏥 Sistema de Marcação de Consultas - Clínica XPTO

Sistema completo de marcação de consultas e exames médicos online desenvolvido em **Angular 20** com simulação de API REST usando **JSON Server**.

## 📋 Funcionalidades Implementadas

### 🔓 Para Utentes Anónimos
- ✅ Visualização da página inicial com informações da clínica
- ✅ Formulário completo de marcação com dados pessoais
- ✅ Sistema de "carrinho" para múltiplos atos clínicos
- ✅ Seleção de preferências de data e horário
- ✅ Validações robustas em formulários reativos
- ✅ Submissão de pedidos com estado "PEDIDO"

### 🔐 Para Utentes Registados
- ✅ Sistema de login com JWT simulado
- ✅ Dashboard personalizado para visualizar histórico
- ✅ Filtros por data e profissional
- ✅ Exportação de marcações em PDF
- ✅ Edição de dados pessoais

### 👩‍💼 Para Administrativos
- ✅ Dashboard para gestão de pedidos pendentes
- ✅ Alteração de estados: PEDIDO → AGENDADO → REALIZADO
- ✅ Simulação de envio de emails de confirmação
- ✅ Visualização de histórico completo

### 👨‍💻 Para Administradores
- ✅ Painel para criação e edição de utilizadores
- ✅ Gestão de roles e credenciais
- ✅ Acesso a todas as funcionalidades administrativas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 20** - Framework principal
- **Bootstrap 5** - UI/UX responsivo
- **Bootstrap Icons** - Iconografia
- **RxJS** - Programação reativa
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de elementos HTML

### Backend Simulado
- **JSON Server** - API REST simulada
- **Concurrently** - Execução simultânea de serviços

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
```
src/app/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas principais
│   ├── page-home/
│   ├── page-login/
│   ├── page-naoregistrado-utente/
│   ├── page-dashboard-user/
│   └── page-dashboard-admin/
├── services/           # Serviços da aplicação
│   ├── api.service.ts
│   ├── auth.service.ts
│   ├── marcacao.service.ts
│   ├── utente.service.ts
│   └── pdf.service.ts
├── models/             # Interfaces e tipos
├── guards/             # Guards de rota
├── shared/             # Componentes compartilhados
│   └── navbar/
└── environments/       # Configurações de ambiente
```

### Modelos de Dados
```typescript
interface Utente {
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

interface PedidoMarcacao {
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
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### Instalação
```bash
# Instalar dependências
npm install

# Executar API simulada e Angular simultaneamente
npm run start:all

# OU executar separadamente:
# JSON Server (porta 3000)
npm run start:api

# Angular (porta 4200)
npm start
```

### Acessos
- **Frontend**: http://localhost:4200
- **API Simulada**: http://localhost:3000

## 🔑 Credenciais de Teste

### Utente Registado
- **Email**: joao.silva@email.com
- **Senha**: 123456
- **Role**: utente

### Administrativo
- **Email**: admin@clinicaxpto.pt
- **Senha**: admin123
- **Role**: administrativo

### Administrador
- **Email**: superadmin@clinicaxpto.pt
- **Senha**: superadmin123
- **Role**: admin

## 🎯 Fluxo de Uso do Sistema

### 1. Marcação Anónima
1. Aceder à página inicial
2. Clicar em "Marcar Consulta"
3. Preencher dados pessoais e upload de fotografia
4. Adicionar atos clínicos ao "carrinho"
5. Definir preferências de data/horário
6. Submeter pedido (estado: PEDIDO)

### 2. Gestão Administrativa
1. Login como administrativo
2. Visualizar pedidos pendentes no dashboard
3. Alterar estado para AGENDADO
4. Definir data específica da consulta
5. Simular envio de email de confirmação
6. Marcar como REALIZADO após consulta

### 3. Área do Utente
1. Login como utente registado
2. Visualizar histórico de marcações
3. Filtrar por datas ou profissionais
4. Exportar comprovativos em PDF
5. Editar dados pessoais

## 📱 Características Responsivas

- ✅ Design mobile-first
- ✅ Navegação adaptativa com collapse
- ✅ Cards e formulários responsivos
- ✅ Tabelas com scroll horizontal
- ✅ Botões e ações otimizados para touch

## 🔒 Segurança Implementada

### Autenticação
- JWT simulado com expiração
- Guards de rota baseados em roles
- Proteção contra acesso não autorizado
- Logout automático em tokens expirados

### Validações
- Formulários reativos com validação em tempo real
- Sanitização de dados de entrada
- Verificação de tipos de arquivo (fotografia)
- Limitação de tamanho de upload

## 📊 Dados de Exemplo

O sistema inclui dados realistas para demonstração:
- 4 utilizadores com diferentes roles
- 3 pedidos de marcação em estados variados
- 6 tipos de atos clínicos disponíveis
- 6 subsistemas de saúde suportados

## 🎨 Interface e UX

### Design System
- Paleta de cores médicas (azul, branco, verde)
- Tipografia clara e legível
- Iconografia consistente (Bootstrap Icons)
- Feedback visual para ações do utilizador

### Componentes Reutilizáveis
- Navbar responsiva com dropdown de utilizador
- Cards informativos com hover effects
- Formulários com validação visual
- Modais e alertas informativos

## 📈 Funcionalidades Avançadas

### Exportação PDF
- Comprovativos de marcação individuais
- Histórico completo do utente
- Layout profissional com header/footer
- Informações completas e organizadas

### Simulação de Email
- Logs detalhados no console
- Mensagens personalizadas por estado
- Integração com fluxo de aprovação

### Gestão de Estado
- Carrinho de atos clínicos persistente
- Estado de autenticação reativo
- Sincronização entre componentes

## 🔧 Configurações Personalizáveis

### API Endpoints
- Base URL configurável via environment
- Timeouts e retry policies
- Interceptors para headers automáticos

### Validações
- Regras de negócio centralizadas
- Mensagens de erro personalizadas
- Validações síncronas e assíncronas

## 📚 Próximos Passos Sugeridos

### Backend Real
- Implementar API REST com Node.js/Express
- Base de dados PostgreSQL ou MongoDB
- Sistema de autenticação robusto

### Funcionalidades Adicionais
- Notificações push em tempo real
- Integração com calendário
- Sistema de avaliação pós-consulta
- Chat/mensagens entre utente e clínica

### Deploy e Produção
- Containerização com Docker
- CI/CD pipeline
- Monitorização e logs
- Backups automatizados

---

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido seguindo as melhores práticas do Angular:
- Arquitetura modular e escalável
- Separação clara de responsabilidades
- Código limpo e bem documentado
- Testes unitários preparados
- Performance otimizada

**Desenvolvido com ❤️ para a Clínica XPTO** 🏥