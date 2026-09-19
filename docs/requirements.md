# Requirements — Surf Time

## 1. Visão do Produto

### Nome
Surf Time

### Problema
Com o fim do TV Time, pessoas que gostam de filmes e séries perderam uma forma simples de "navegar" (surfar) pelo catálogo a partir de algo que já sabem que gostam — um gênero. A maioria dos serviços de streaming mistura catálogo próprio com algoritmos fechados, dificultando a exploração livre por gênero em um só lugar, sem vínculo com uma assinatura específica.

### Público
Pessoas que gostam de filmes, não sabem exatamente o que assistir, mas sabem o "clima"/gênero que querem naquele momento (ex: "hoje quero um terror" ou "quero uma comédia leve") e preferem explorar visualmente em vez de depender de recomendações automáticas.

### Proposta de solução
Uma plataforma web responsiva onde o usuário escolhe um gênero em uma grade visual e recebe uma lista de filmes daquele gênero (pôster, título e nota), podendo abrir qualquer filme para ver uma página de detalhes com sinopse, nota, data de lançamento e elenco principal — ajudando a decidir o que assistir antes de procurar em qualquer serviço de streaming.

## 2. Objetivo do MVP

Ao final do projeto, o usuário deve conseguir: abrir o site, visualizar a lista de gêneros de filmes na Home, escolher um gênero, visualizar a lista de filmes daquele gênero em formato de grade (pôster + título + nota) e abrir qualquer filme para ver uma página de detalhes completa (sinopse, nota, data de lançamento, gêneros e elenco principal), com estados de carregamento, vazio e erro tratados em todas as páginas que consomem a API.

## 3. Funcionalidades

### F01 — Navegação por gêneros (Home)

**Descrição:** A Home exibe, no estilo Netflix/HBO Max, fileiras horizontais de filmes — uma fileira por gênero em destaque. Cada fileira permite rolar lateralmente pelos pôsteres e tem um link "Ver tudo" que leva à listagem completa daquele gênero.

**Critérios de aceitação:**
- [ ] Ao abrir `/`, a Home busca os gêneros e, para cada gênero em destaque, os filmes correspondentes na API do TMDB
- [ ] Cada gênero aparece como uma fileira com título e pôsteres roláveis horizontalmente
- [ ] Cada fileira tem um link "Ver tudo" que navega para `/genero/:id`, levando também o nome do gênero
- [ ] Clicar em um pôster navega direto para `/titulo/:id` daquele filme

**Estados:**
- [ ] Inicial
- [ ] Carregando
- [ ] Sucesso
- [ ] Vazio
- [ ] Erro

### F02 — Resultados por gênero

**Descrição:** Página que lista, em grade, os filmes pertencentes ao gênero selecionado (pôster, título e nota média).

**Critérios de aceitação:**
- [ ] Acessar `/genero/:id` busca filmes daquele gênero na API do TMDB
- [ ] O nome do gênero selecionado é exibido no topo da página
- [ ] Cada filme exibe pôster, título e nota média
- [ ] Clicar em um filme navega para `/titulo/:id`
- [ ] Se a API não retornar filmes, é exibido um estado vazio explicativo

**Estados:**
- [ ] Inicial
- [ ] Carregando
- [ ] Sucesso
- [ ] Vazio
- [ ] Erro

### F03 — Detalhe do título

**Descrição:** Página de detalhe de um filme, mostrando pôster, sinopse, nota, data de lançamento, gêneros e elenco principal.

**Critérios de aceitação:**
- [ ] Acessar `/titulo/:id` busca os detalhes e o elenco do filme na API do TMDB
- [ ] São exibidos: pôster, título, sinopse, nota média, data de lançamento, gêneros e até 8 atores do elenco principal
- [ ] Existe um link/botão para voltar à listagem anterior
- [ ] Se o filme não for encontrado, é exibido um estado de erro claro

**Estados:**
- [ ] Inicial
- [ ] Carregando
- [ ] Sucesso
- [ ] Erro

## 4. Fora do Escopo

- Login/cadastro e contas de usuário
- Registrar filmes como assistidos ou criar avaliações próprias
- Busca por texto livre (o MVP foca 100% em descoberta por gênero)
- Séries de TV (o MVP cobre apenas filmes, para manter o escopo enxuto)
- Indicação de "onde assistir" (streamings disponíveis)
- Recomendações personalizadas baseadas em histórico do usuário
- Comunidade, comentários ou interação social
