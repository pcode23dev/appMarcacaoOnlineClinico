# 🏥 Clínica XPTO - Sistema de Marcação Online

Sistema completo de marcação de consultas e exames médicos desenvolvido em Angular 20 com JSON Server.

## 🚀 Execução Rápida

```bash
# Instalar dependências
npm install

# Executar API + Angular (simultaneamente)
npm run start:all
```

**Acessos:**
- 🌐 **Frontend**: http://localhost:4200
- 🔌 **API**: http://localhost:3000

## 🔑 Credenciais de Teste

| Tipo | Email | Senha | Função |
|------|-------|-------|---------|
| **Utente** | joao.silva@email.com | 123456 | Dashboard + Histórico |
| **Admin** | admin@clinicaxpto.pt | admin123 | Gestão de Pedidos |
| **Super Admin** | superadmin@clinicaxpto.pt | superadmin123 | Gestão de Utilizadores |

## ✨ Funcionalidades

### Para Utentes Anónimos
- ✅ Marcação de consultas sem registo
- ✅ Formulário completo com upload de foto
- ✅ Carrinho de atos clínicos
- ✅ Preferências de data/horário

### Para Utentes Registados  
- ✅ Login seguro com JWT
- ✅ Histórico de marcações
- ✅ Exportação PDF
- ✅ Edição de dados pessoais

### Para Administrativos
- ✅ Dashboard de gestão
- ✅ Aprovação de pedidos (PEDIDO → AGENDADO → REALIZADO)
- ✅ Simulação de envio de emails
- ✅ Agendamento de consultas

### Para Administradores
- ✅ Criação/edição de utilizadores
- ✅ Gestão de roles e permissões
- ✅ Acesso completo ao sistema

## 🎯 Fluxo Principal

1. **Página Inicial** → Informações da clínica
2. **Marcação Anónima** → Formulário completo
3. **Login** → Acesso a área restrita
4. **Dashboard** → Gestão baseada no role
5. **Aprovação** → Workflow administrativo

## 🛠️ Tecnologias

- **Angular 20** - Framework
- **Bootstrap 5** - UI/CSS
- **JSON Server** - API simulada  
- **jsPDF** - Exportação PDF
- **RxJS** - Programação reativa

## 📱 Características

- 📱 **Responsivo** - Mobile-first design
- 🔒 **Seguro** - Guards e validações
- 🎨 **Moderno** - Interface limpa e intuitiva
- ⚡ **Performante** - Otimizado para velocidade

---

**📋 Veja `SISTEMA_MARCACAO_CLINICA_XPTO.md` para documentação completa**
