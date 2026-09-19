# References — Surf Time

## 1. Objetivo

As referências abaixo orientam as decisões de experiência e interface do Surf Time, com foco na necessidade escolhida: **descoberta de filmes por gênero**.

> **Nota:** as imagens desta pasta (`referencia-01.png`, `referencia-02.png`, `referencia-03.png`) precisam ser capturadas manualmente pelo grupo (este ambiente de desenvolvimento não tem acesso à internet para gerar os prints) e salvas em `docs/references/imagens/` com esses nomes antes da entrega.

## 2. Referência 01 — Spotify (Browse: Genres & Moods)

### Fonte
https://open.spotify.com/genre

### Imagem

![Referência 01](./imagens/referencia-01.png)

### O que observamos?
A tela "Browse" do Spotify organiza toda a exploração de conteúdo em uma grade de cards retangulares e coloridos, um por gênero/humor (ex: Pop, Rock, Chill), sem nenhuma lista de texto — a cor e o nome curto do card já comunicam a categoria antes mesmo do clique.

### O que vamos aproveitar?
A ideia de transformar a "lista de gêneros" — que poderia ser um `<select>` ou uma lista simples — em uma grade de cards grandes, coloridos e clicáveis, tornando a escolha do gênero um momento visual e não burocrático.

### Como será adaptado?
Na Home do Surf Time, cada gênero retornado pela API do TMDB vira um `GenreCard` com uma cor de fundo própria (gerada a partir do id do gênero, já que o TMDB não fornece cor) e o nome do gênero centralizado — replicando a sensação de "vitrine" do Spotify, mas em grade responsiva simples de CSS Grid.

## 3. Referência 02 — Letterboxd (página de detalhe do filme)

### Fonte
https://letterboxd.com/film/

### Imagem

![Referência 02](./imagens/referencia-02.png)

### O que observamos?
A página de filme do Letterboxd organiza a informação em hierarquia clara: pôster grande à esquerda/topo, título e ano em destaque, sinopse logo abaixo, e nota média bem visível próxima ao título — sem excesso de elementos concorrendo por atenção.

### O que vamos aproveitar?
A hierarquia visual (pôster → título/ano → nota → sinopse → elenco) como estrutura da nossa página de detalhe, garantindo que a informação mais importante para decidir "vou assistir ou não" apareça primeiro, sem precisar rolar a página.

### Como será adaptado?
A `TitleDetail` do Surf Time replica essa ordem com dados do TMDB: pôster (`poster_path`), título + `release_date`, nota (`vote_average`) em um badge, sinopse (`overview`) e, abaixo, uma lista horizontal com o elenco principal vindo do endpoint de créditos.

## 4. Referência 03 — JustWatch (filtro de gênero + grade de pôsteres)

### Fonte
https://www.justwatch.com/br/filmes

### Imagem

![Referência 03](./imagens/referencia-03.png)

### O que observamos?
O JustWatch exibe resultados de busca/filtro como uma grade responsiva de pôsteres com a nota sobreposta no canto do próprio pôster, permitindo escanear muitos títulos rapidamente sem precisar abrir cada um.

### O que vamos aproveitar?
O padrão de grade de pôsteres com nota sobreposta para a página de resultados por gênero, priorizando densidade e escaneabilidade em vez de cards grandes com muito texto.

### Como será adaptado?
O `MovieCard` do Surf Time (usado em `GenreResults`) mostra o pôster do TMDB (`poster_path`) ocupando todo o card, com um badge de nota (`vote_average`) sobreposto no canto superior e o título abaixo — em uma grade que se reorganiza conforme a largura da tela (responsivo).
