#!/bin/bash

echo "🏥 Iniciando Sistema de Marcação - Clínica XPTO"
echo "================================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "🔌 Iniciando JSON Server (API) na porta 3000..."
json-server --watch db.json --port 3000 &
JSON_PID=$!

echo "⏳ Aguardando API inicializar..."
sleep 3

echo "🚀 Iniciando Angular na porta 4200..."
npm start &
ANGULAR_PID=$!

echo ""
echo "✅ Servidores iniciados com sucesso!"
echo ""
echo "🌐 Frontend: http://localhost:4200"
echo "🔌 API:      http://localhost:3000"
echo ""
echo "🔑 Credenciais de teste:"
echo "   Utente:        joao.silva@email.com / 123456"
echo "   Administrativo: admin@clinicaxpto.pt / admin123"
echo "   Administrador:  superadmin@clinicaxpto.pt / superadmin123"
echo ""
echo "⚠️  Pressione Ctrl+C para parar os servidores"

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🔄 Parando servidores..."
    kill $JSON_PID 2>/dev/null
    kill $ANGULAR_PID 2>/dev/null
    echo "✅ Servidores parados com sucesso!"
    exit 0
}

# Capturar sinais para limpeza
trap cleanup SIGINT SIGTERM

# Manter o script rodando
wait