<div align="center">

# 🎮 GRID

### Game Resource & Information Database

**Descubra seu próximo jogo favorito**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Instalação](#-instalação) • [Estrutura](#-estrutura-do-projeto)

</div>

---

## 📖 Sobre

O **GRID** é uma aplicação web moderna para descoberta de jogos, construída com React 19 e integrada com a [API RAWG](https://rawg.io/apidocs). Permite explorar milhares de jogos, pesquisar títulos, filtrar por plataforma/gênero e salvar seus favoritos em uma biblioteca pessoal.

## ✨ Features

- 🔍 **Busca inteligente** com debounce e resultados em tempo real
- 📱 **Design responsivo** - experiência otimizada para mobile e desktop
- ♾️ **Infinite scroll** - carregamento automático de mais jogos
- 🎯 **Filtros avançados** - por plataforma, gênero e ordenação
- 📚 **Biblioteca pessoal** - salve jogos com status (playing, backlog, completed, wishlist)
- 🔐 **Autenticação** - login com email/senha ou Magic Link
- 👤 **Perfil de usuário** - customize username e defina senha
- 🌙 **Dark mode** - interface escura elegante

## 🛠 Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| **Framework** | React 19 |
| **Linguagem** | TypeScript 5.8 |
| **Build Tool** | Vite 7 |
| **Estilização** | Tailwind CSS 4 |
| **Roteamento** | React Router DOM 7 |
| **Estado Servidor** | TanStack React Query |
| **HTTP Client** | Axios |
| **Backend/Auth** | Supabase |
| **Linting** | ESLint 9 (flat config) + Prettier |

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com/) (para autenticação)
- API Key do [RAWG](https://rawg.io/apidocs)

### Setup

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/grid.git
cd grid

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_RAWG_API_KEY=sua_api_key_rawg
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_anon_key_supabase
```

### Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/                    # Imagens e ícones
│   └── icons/                 # Componentes de ícones SVG
├── components/
│   ├── Layout/
│   │   └── MainLayout.tsx     # Layout principal (header, outlet)
│   └── ui/                    # Componentes reutilizáveis
│       ├── Button.tsx         # Botão com variantes
│       ├── Input.tsx          # Input estilizado
│       ├── GameCard.tsx       # Card de jogo (desktop)
│       ├── GameCardMobile.tsx # Card de jogo (mobile)
│       ├── Sidebar.tsx        # Filtros laterais
│       ├── SearchInput.tsx    # Barra de pesquisa
│       ├── SearchModal.tsx    # Modal de resultados
│       └── AuthModal.tsx      # Modal de login/cadastro
├── context/
│   ├── AuthContext.tsx        # Contexto de autenticação
│   └── FilterContext.tsx      # Contexto de filtros globais
├── features/
│   ├── games/
│   │   ├── api/               # Funções de API (getGames, searchGames)
│   │   ├── hooks/             # Hooks (useGames, useSearchGames)
│   │   └── types.ts           # Tipos TypeScript
│   ├── library/               # Biblioteca do usuário
│   └── profile/               # Perfil do usuário
├── hooks/
│   ├── useDebounce.ts         # Debounce genérico
│   └── useIntersectionObserver.ts # Observer para infinite scroll
├── lib/
│   ├── axios.ts               # Instância Axios configurada
│   └── supabase.ts            # Cliente Supabase
├── pages/
│   ├── Home/                  # Página inicial
│   ├── GameDetails/           # Detalhes do jogo
│   ├── MyLibrary/             # Biblioteca pessoal
│   └── Account/               # Configurações de conta
├── routes/
│   └── index.tsx              # Configuração de rotas
└── utils/                     # Utilitários
```

## 🎨 Design System

O projeto utiliza um design system consistente:

### Cores

- **Primary**: Purple (`purple-600`)
- **Background**: Neutral (`neutral-900`)
- **Surface**: Neutral (`neutral-800`)
- **Text**: White / Neutral (`neutral-400`)

### Componentes

```tsx
// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Input com ícone
<Input icon={<SearchIcon />} placeholder="Search..." />
```

## 📱 Responsividade

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< md`) | Grid 2 colunas, cards simplificados, sidebar drawer |
| Tablet (`md`) | Grid 3 colunas |
| Desktop (`lg`) | Grid 4-5 colunas, sidebar fixa |

## 🗺 Roadmap

- [x] Listagem de jogos com infinite scroll
- [x] Sistema de busca com debounce
- [x] Filtros por plataforma, gênero e ordenação
- [x] Página de detalhes do jogo
- [x] Autenticação (email/senha + Magic Link)
- [x] Biblioteca pessoal do usuário
- [x] Perfil com edição de dados
- [ ] Compartilhamento de biblioteca
- [ ] Integração com mais APIs (Steam, IGDB)
- [ ] PWA com suporte offline
- [ ] Sistema de reviews/ratings

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**GRID** - Feito com 💜 usando React + TypeScript

</div>
