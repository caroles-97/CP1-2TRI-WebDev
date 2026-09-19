# Architecture — Surf Time

## 1. Visão Geral

Surf Time é uma SPA React criada com Vite. A navegação é feita com **React Router** no padrão usado em aula: as rotas são declaradas como um array de objetos com `createBrowserRouter`, em `main.jsx`, renderizado via `<RouterProvider />` (em vez da sintaxe JSX `<Routes>/<Route>`). Um `Layout` fixo (cabeçalho com o nome do app + `<Outlet />`) envolve três páginas — a Home (fileiras horizontais de filmes por gênero, inspiradas no Netflix/HBO Max — ver `docs/references`; é o próprio `App.jsx`, referenciado como rota `index`), GenreResults (grade completa de filmes de um gênero, rota dinâmica, acessada pelo "Ver tudo" de cada fileira) e TitleDetail (detalhe de um filme, rota dinâmica). Cada página busca seus próprios dados na API do TMDB dentro de um `useEffect`, controlando estados locais de carregamento, sucesso, vazio e erro com `useState`. Não há gerenciamento de estado global nem backend próprio — toda a informação vem da API pública do TMDB.

Os componentes seguem o padrão de aula: `const Nome = (props) => { ... }` com `export default Nome` no final (em vez de `export default function Nome() {}`).

## 2. Estrutura de Pastas

```text
src/
├── components/
│   ├── Header.jsx
│   ├── GenreRow.jsx
│   ├── MovieCard.jsx
│   ├── Loader.jsx
│   ├── EmptyState.jsx
│   └── ErrorState.jsx
├── pages/
│   ├── Layout.jsx
│   ├── GenreResults.jsx
│   └── TitleDetail.jsx
├── services/
│   └── tmdb.js
├── App.jsx        (conteúdo da Home — rota "index")
├── main.jsx        (configuração das rotas com createBrowserRouter)
└── index.css
```

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| App (Home) | `/` (rota `index`) | Exibir fileiras horizontais de filmes, uma por gênero em destaque, no estilo Netflix/HBO Max |
| GenreResults | `/genero/:id` | Exibir a grade completa de filmes pertencentes a um gênero (acessada pelo "Ver tudo" de uma fileira) |
| TitleDetail | `/titulo/:id` | Exibir os detalhes completos de um filme (sinopse, nota, elenco) |

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| Layout (`pages/Layout.jsx`) | Estrutura fixa da aplicação (Header + área de conteúdo via `<Outlet />`) | — |
| Header | Exibir o nome "Surf Time" e link de volta para a Home | — |
| GenreRow | Exibir o nome de um gênero, um link "Ver tudo" e a fileira horizontal com scroll de filmes daquele gênero | `genre` (`{ id, name }`), `movies` (array de filmes) |
| MovieCard | Exibir pôster, título e nota de um filme e navegar para o detalhe | `movie` (`{ id, title, poster_path, vote_average }`) |
| Loader | Indicar visualmente que uma requisição está em andamento | `label` (texto opcional) |
| EmptyState | Comunicar que uma busca não retornou resultados | `message` |
| ErrorState | Comunicar falha de requisição e permitir nova tentativa | `message`, `onRetry` |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `genreRows` (array de `{ genre, movies }`), `status` (`loading/success/empty/error`) | `App.jsx` (Home) | A Home precisa saber, para cada gênero em destaque, se os filmes já chegaram, para montar as fileiras, e refletir carregamento/erro geral da página |
| `movies`, `genreName`, `status` | `GenreResults.jsx` | Cada troca de `:id` na rota exige nova busca e novo controle de carregamento/erro/vazio independente da Home |
| `movie`, `credits`, `status` | `TitleDetail.jsx` | O detalhe depende de dois recursos da API (filme + elenco) e precisa refletir o carregamento/erro dessa página isoladamente |

Cada página mantém seu próprio estado local porque os dados não são compartilhados entre rotas — não há necessidade de um estado global (Context/Redux) neste MVP.

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Montar as fileiras da Home | Ao montar `App.jsx` | Chama `tmdb.getGenres()`, filtra um conjunto fixo de gêneros em destaque e, para cada um, chama `tmdb.getMoviesByGenre(id)` em paralelo (`Promise.all`), montando `genreRows`/`status` |
| Buscar filmes por gênero | Ao montar `GenreResults.jsx` e sempre que o parâmetro `:id` da rota mudar | Chama `tmdb.getMoviesByGenre(id)` e atualiza `movies`/`status` |
| Buscar detalhe do filme | Ao montar `TitleDetail.jsx` e sempre que o parâmetro `:id` da rota mudar | Chama `tmdb.getMovieDetails(id)` e `tmdb.getMovieCredits(id)` em paralelo e atualiza `movie`/`credits`/`status` |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react-router | Roteamento com múltiplas páginas, layout compartilhado e rotas dinâmicas (`:id`), via `createBrowserRouter` | Padrão utilizado em aula para navegação SPA em React |
| react-icons | Ícones de interface (carregando, erro, voltar) | Biblioteca de ícones leve e com import simples por componente |
