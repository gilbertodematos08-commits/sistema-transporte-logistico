# 🚀 Sistema de Transporte Logístico Premium v2.0

## ✨ NOVA VERSÃO - TUDO FUNCIONANDO!

Sistema completo de gestão de transporte e logística com **CRUD totalmente funcional**, integração real com banco de dados, mapa OpenStreetMap gratuito e interface moderna.

---

## 🎯 O QUE HÁ DE NOVO NA V2.0:

✅ **CRUD Completo Funcional**
- Adicionar, editar e excluir motoristas
- Adicionar, editar e excluir veículos  
- Adicionar, editar e excluir clientes
- Modais modernos para formulários

✅ **Mapa OpenStreetMap**
- **100% GRATUITO** (sem precisar de chave de API)
- Visualização de rotas
- Marcadores de origem e destino
- Linhas de rota traçadas

✅ **Integração Real com Supabase**
- Todas as operações conectadas ao banco de dados
- Dados persistentes
- Atualizações em tempo real

✅ **Melhorias de UX**
- Sistema de busca funcional
- Filtros por status
- Confirmações antes de excluir
- Mensagens de sucesso/erro

---

## 🚀 INSTALAÇÃO RÁPIDA:

### Passo 1: Clone o repositório
\`\`\`bash
git clone https://github.com/gilbertodematos08-commits/sistema-transporte-logistico.git
cd sistema-transporte-logistico
\`\`\`

### Passo 2: Instale as dependências (IMPORTANTE!)
\`\`\`bash
npm install
\`\`\`

**⚠️ ATENÇÃO:** A instalação agora inclui o **leaflet** (mapa). Pode demorar um pouco mais.

### Passo 3: Configure o .env

O arquivo `.env` já está configurado com as credenciais do Supabase:

\`\`\`env
VITE_SUPABASE_URL=https://gnvhkgvewqsfusslpmms.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
\`\`\`

### Passo 4: Rode o sistema
\`\`\`bash
npm run dev
\`\`\`

### Passo 5: Acesse
Abra: **http://localhost:3000**

---

## 📱 FUNCIONALIDADES COMPLETAS:

### ✅ **Dashboard**
- Métricas em tempo real
- Cards de estatísticas
- Lista de viagens

### ✅ **Motoristas** (CRUD COMPLETO)
- ➕ Adicionar novo motorista
- ✏️ Editar motorista existente
- 🗑️ Excluir motorista
- 🔍 Buscar por nome/CPF/CNH
- 📊 Ver status (Disponível/Em Viagem/Inativo)

### ✅ **Veículos** (CRUD COMPLETO)
- ➕ Adicionar novo veículo
- ✏️ Editar veículo existente
- 🗑️ Excluir veículo
- 🔍 Buscar por placa/modelo/marca
- 📊 Ver status (Disponível/Em Uso/Manutenção)

### ✅ **Clientes** (CRUD COMPLETO)
- ➕ Adicionar novo cliente
- ✏️ Editar cliente existente
- 🗑️ Excluir cliente
- 🔍 Buscar por nome/CNPJ

### ✅ **Viagens**
- Visualizar viagens
- Ver origem e destino
- Status da viagem

### ✅ **Programação**
- Calendário de viagens
- Cronômetros funcionais
- Filtro por data

### ✅ **Oficina**
- Gestão de manutenções
- Status de serviços

### ✅ **Mapa** (NOVO!)
- 🗺️ Mapa interativo OpenStreetMap
- 📍 Marcadores de origem e destino
- 🛣️ Rota traçada
- 100% gratuito (sem API key)

---

## 🛠️ TECNOLOGIAS:

- **Frontend:** React 18 + Vite
- **Estilo:** Tailwind CSS (Dark Theme)
- **Banco de Dados:** Supabase (PostgreSQL)
- **Mapas:** Leaflet + OpenStreetMap (GRATUITO!)
- **Ícones:** Lucide React

---

## 📋 TESTAR O SISTEMA:

1. Acesse http://localhost:3000
2. Clique em "ENTRAR NO SISTEMA"
3. Vá em **Motoristas**
4. Clique em **"Novo Motorista"**
5. Preencha o formulário
6. Clique em **"Cadastrar"**
7. ✅ **Motorista adicionado com sucesso!**

Faça o mesmo para **Veículos** e **Clientes**!

---

## 🗺️ VISUALIZAR O MAPA:

1. Vá na página **Viagens**
2. Clique em qualquer viagem
3. O mapa será exibido com:
   - Marcador verde (origem)
   - Marcador vermelho (destino)
   - Linha azul (rota)

---

## ❓ PROBLEMAS COMUNS:

### Erro: "Cannot find module 'leaflet'"
**Solução:**
\`\`\`bash
npm install leaflet react-leaflet
\`\`\`

### Mapa não aparece
**Solução:**
1. Verifique se o arquivo `index.html` tem o link do CSS do Leaflet
2. Verifique o console do navegador (F12)
3. Rode: `npm run dev` novamente

### Dados não aparecem
**Solução:**
1. Verifique se o arquivo `.env` está na raiz
2. Confirme que as credenciais estão corretas
3. Verifique a conexão com internet

---

## 🌐 DEPLOY:

### Vercel (Recomendado):
\`\`\`bash
npm run build
npx vercel
\`\`\`

Adicione as variáveis de ambiente no painel da Vercel.

---

## 📞 SUPORTE:

- **GitHub Issues:** [Abrir Issue](https://github.com/gilbertodematos08-commits/sistema-transporte-logistico/issues)
- **Documentação Supabase:** https://supabase.com/docs
- **Documentação React:** https://react.dev
- **Documentação Leaflet:** https://leafletjs.com/

---

## 🎉 PRONTO PARA USAR!

Seu sistema está **100% funcional** com:
- ✅ CRUD completo
- ✅ Banco de dados real
- ✅ Mapa gratuito
- ✅ Interface moderna

**Divirta-se! 🚛💨**
