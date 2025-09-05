
# Pokédex React

## Propósito da aplicação

Esta aplicação foi desenvolvida como parte do teste técnico do curso DevQuest, simulando um desafio de frontend. O objetivo é criar uma Pokédex interativa, permitindo ao usuário explorar e visualizar detalhes dos pokémons utilizando a [PokeAPI](https://pokeapi.co/).

## Funcionalidades

- Listagem inicial de 10 pokémons com nome e imagem.
- Botão "Carregar mais" para adicionar mais 10 pokémons à lista.
- Filtro por nome: barra de pesquisa para buscar pokémons pelo nome.
- Filtro por tipo: seleção para listar apenas pokémons de um tipo específico.
- Página de detalhes: ao clicar em um pokémon, exibe imagem, nome, tipos, habilidades (com descrição) e movimentos.
- Alternância de tema (claro/escuro) via Context API.
- Design responsivo e estilizado com fonte temática e cores inspiradas no universo Pokémon.
- Testes unitários com Jest e Testing Library.

## Ferramentas utilizadas

- **React.js**: SPA moderna e reativa.
- **Context API**: gerenciamento de estado global para o tema.
- **styled-components**: estilização dinâmica e modular dos componentes.
- **react-router-dom**: navegação entre páginas (Home e Detalhes).
- **Jest + Testing Library**: testes unitários de componentes e funcionalidades.
- **PokeAPI**: fonte de dados dos pokémons.

**Justificativa:**
Essas ferramentas são padrão de mercado para aplicações React, facilitam a organização, escalabilidade e manutenção do código, além de permitirem uma experiência rica e interativa ao usuário.

## Decisões técnicas

- Estrutura modular: separação clara entre componentes, páginas, contexto e estilos.
- SPA com rotas: melhor experiência de navegação sem recarregar a página.
- Tema dinâmico: uso do Context API para alternância entre claro/escuro.
- Estilo personalizado: fonte Pokémon e cores temáticas para maior imersão.
- Testes automatizados: garantia de funcionamento dos principais componentes.
- Filtros dinâmicos: busca por nome e tipo para facilitar a navegação do usuário.

## Passo a passo para rodar o projeto

1. **Clone o repositório:**
	```sh
	git clone https://github.com/Renannl/pokedex-react.git
	cd pokedex-react
	```

2. **Instale as dependências:**
	```sh
	npm install
	```

3. **Inicie o projeto:**
	```sh
	npm start
	```
	O app estará disponível em `http://localhost:3000`.

4. **Rode os testes unitários:**
	```sh
	npx jest --config jest.config.cjs --setupFilesAfterEnv=./src/setupTests.js
	```

## Observações

- É necessário ter o Node.js instalado.
- O projeto foi desenvolvido para fins didáticos e pode ser expandido com novas funcionalidades.

---

**Desafio realizado por Renan Lovo Boni.**
