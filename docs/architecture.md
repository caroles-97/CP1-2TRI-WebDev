# Architecture — Surf Time

## 1. Visão Geral

Surf Time é uma SPA React criada com Vite. A navegação é feita com React Router: um layout fixo (cabeçalho com o nome do app) envolve três páginas — Home (lista de gêneros), GenreResults (filmes de um gênero, rota dinâmica) e TitleDetail (detalhe de um filme, rota dinâmica). Cada página busca seus próprios dados na API do TMDB dentro de um `useEffect`, controlando estados locais de carregamento, sucesso, vazio e erro com `useState`. Não há gerenciamento de estado global nem backend próprio — toda a informação vem da API pública do TMDB.

## 2. Estrutura de Pastas

```text
src/
├── components/
│   ├── Layout.jsx
│   ├── Header.jsx
│   ├── GenreCard.jsx
│   ├── MovieCard.jsx
│   ├── Loader.jsx
│   ├── EmptyState.jsx
│   └── ErrorState.jsx
├── pages/
│   ├── Home.jsx
│   ├── GenreResults.jsx
│   └── TitleDetail.jsx
├── services/
│   └── tmdb.js
├── App.jsx
├── main.jsx
└── index.css
```

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Home | `/` | Exibir a grade de gêneros de filmes disponíveis e permitir a escolha de um deles |
| GenreResults | `/genero/:id` | Exibir a grade de filmes pertencentes ao gênero escolhido |
| TitleDetail | `/titulo/:id` | Exibir os detalhes completos de um filme (sinopse, nota, elenco) |

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| Layout | Estrutura fixa da aplicação (Header + área de conteúdo via `<Outlet />`) | — |
| Header | Exibir o nome "Surf Time" e link de volta para a Home | — |
| GenreCard | Exibir um card clicável de gênero e navegar para seus resultados | `genre` (`{ id, name }`), `onSelect` |
| MovieCard | Exibir pôster, título e nota de um filme e navegar para o detalhe | `movie` (`{ id, title, poster_path, vote_average }`) |
| Loader | Indicar visualmente que uma requisição está em andamento | `label` (texto opcional) |
| EmptyState | Comunicar que uma busca não retornou resultados | `message` |
| ErrorState | Comunicar falha de requisição e permitir nova tentativa | `message`, `onRetry` |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `genres`, `status` (`idle/loading/success/empty/error`) | `Home.jsx` | A Home precisa saber se a lista de gêneros já chegou, está vazia ou falhou para decidir o que renderizar |
| `movies`, `genreName`, `status` | `GenreResults.jsx` | Cada troca de `:id` na rota exige nova busca e novo controle de carregamento/erro/vazio independente da Home |
| `movie`, `credits`, `status` | `TitleDetail.jsx` | O detalhe depende de dois recursos da API (filme + elenco) e precisa refletir o carregamento/erro dessa página isoladamente |

Cada página mantém seu próprio estado local porque os dados não são compartilhados entre rotas — não há necessidade de um estado global (Context/Redux) neste MVP.

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar gêneros | Ao montar `Home.jsx` | Chama `tmdb.getGenres()` e atualiza `genres`/`status` |
| Buscar filmes por gênero | Ao montar `GenreResults.jsx` e sempre que o parâmetro `:id` da rota mudar | Chama `tmdb.getMoviesByGenre(id)` e atualiza `movies`/`status` |
| Buscar detalhe do filme | Ao montar `TitleDetail.jsx` e sempre que o parâmetro `:id` da rota mudar | Chama `tmdb.getMovieDetails(id)` e `tmdb.getMovieCredits(id)` em paralelo e atualiza `movie`/`credits`/`status` |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react-router-dom | Roteamento com múltiplas páginas, layout compartilhado e rotas dinâmicas (`:id`) | Padrão utilizado em aula para navegação SPA em React |
| react-icons | Ícones de interface (carregando, erro, voltar) | Biblioteca de ícones leve e com import simples por componente |
