# Surf Time

Trabalho CP1 da matéria WebDev — MVP em React inspirado no vácuo deixado pelo fim do TV Time.

## Integrantes

- Carolina Kiyomi Hada — RM 571664

## Problema

Com o encerramento do TV Time, quem gosta de filmes perdeu uma forma simples de explorar o catálogo a partir de algo que já sabe que gosta — um gênero. A maioria dos serviços mistura catálogo próprio com recomendações algorítmicas fechadas, dificultando a exploração livre por gênero, sem depender de uma assinatura específica.

## Solução

O **Surf Time** é uma plataforma web responsiva onde o usuário escolhe um gênero em uma grade visual colorida e recebe uma lista de filmes daquele gênero (pôster, título e nota). A partir daí, pode abrir qualquer filme para ver uma página de detalhes com sinopse, nota, data de lançamento, gêneros e elenco principal — ajudando a decidir o que assistir antes de procurar em qualquer serviço de streaming.

Documentação completa de requisitos, arquitetura e referências de design em [`docs/`](./docs).

## Funcionalidades

- **Navegação por gêneros** (`/`): grade de cards coloridos com todos os gêneros de filme do TMDB.
- **Resultados por gênero** (`/genero/:id`): grade de filmes do gênero escolhido, com pôster, título e nota.
- **Detalhe do título** (`/titulo/:id`): sinopse, nota, data de lançamento, gêneros e elenco principal.
- Estados de carregamento, vazio e erro (com nova tentativa) em todas as páginas que consomem a API.

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) (rotas, layout compartilhado e rotas dinâmicas)
- [react-icons](https://react-icons.github.io/react-icons/) (biblioteca de ícones)
- CSS puro (`src/index.css`)

## API usada

[TMDB — The Movie Database](https://developer.themoviedb.org/docs/getting-started) (endpoints de gêneros, descoberta de filmes por gênero, detalhes e créditos/elenco).

## Uso de IA

O desenvolvimento seguiu a metodologia de Spec Driven Development com apoio de IA (Claude): a IA foi usada para estruturar a documentação (`docs/requirements.md`, `docs/architecture.md`, `docs/references/references.md`) e para gerar o código a partir dessa especificação. As decisões de produto (problema escolhido, nome, escopo do MVP, funcionalidades incluídas/excluídas) e de design (paleta, layout, referências visuais) foram tomadas pela integrante do grupo ao longo do processo, com a IA implementando a partir dessas decisões.

## Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+ instalado

### Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd CP1-2TRI-WebDev

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo de variáveis de ambiente
cp .env.example .env
```

Edite o `.env` com sua própria chave da API do TMDB (veja como conseguir uma em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)):

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

```bash
# 4. Rodar em modo desenvolvimento
npm run dev

# 5. Gerar build de produção (opcional)
npm run build
npm run preview
```

O projeto abre por padrão em `http://localhost:5173`.

## Deploy

Publicado na Vercel — configure a variável de ambiente `VITE_TMDB_API_KEY` (e `VITE_TMDB_READ_ACCESS_TOKEN`, se necessário) nas configurações do projeto antes do deploy.
