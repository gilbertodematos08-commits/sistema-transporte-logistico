# 🚀 Sistema de Transporte Logístico Premium

Sistema completo de gestão de transporte e logística com dashboard em tempo real, CRUD completo, programação de viagens com cronômetros, integração com Google Maps e muito mais!

## ✨ Funcionalidades

- 📊 **Dashboard Interativo** - Métricas em tempo real com design premium
- 👥 **Gestão de Motoristas** - CRUD completo com controle de status
- 🚛 **Gestão de Veículos** - Controle de frota e manutenção
- 🏢 **Gestão de Clientes** - Cadastro e histórico de clientes
- 🗺️ **Gestão de Viagens** - Rotas, distâncias e rastreamento
- 📅 **Programação** - Calendário com cronômetros em tempo real
- 🔧 **Oficina** - Controle de manutenções preventivas e corretivas
- 🗺️ **Integração Google Maps** - Cálculo automático de rotas
- 🔔 **Notificações** - Sistema de alertas em tempo real

## 🛠️ Tecnologias

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (Dark Premium Theme)
- **Database**: Supabase (PostgreSQL)
- **Maps**: Google Maps API
- **Deploy**: Vercel

## 🚀 Como Executar

### 1. Clone o repositório
\`\`\`bash
git clone <repo-url>
cd sistema-transporte-logistico
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente
Crie um arquivo \`.env\` na raiz:
\`\`\`
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_supabase
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps
\`\`\`

### 4. Inicie o servidor de desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

Acesse: http://localhost:3000

## 📦 Deploy

Para fazer deploy no Vercel:
\`\`\`bash
npm run build
vercel --prod
\`\`\`

## 📄 Licença

MIT License - sinta-se livre para usar em seus projetos!
