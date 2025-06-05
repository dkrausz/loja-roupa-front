# Loja de Roupas - Frontend

Uma aplicação frontend para uma loja de roupas, desenvolvida com React, TypeScript e Vite, utilizando Tailwind CSS para estilização. Este projeto busca fornecer uma interface moderna para usuários navegarem e comprarem produtos de vestuário.

---

## 🔍 Descrição

Este projeto é a parte frontend do sistema de loja de roupas, responsável por:

- Exibir uma lista de produtos disponíveis para venda.
- Exibir detalhes de cada produto (imagens, descrições, preços).
- Filtrar a lista por preço e tamanho.
- Permitir que usuários adicionem produtos ao carrinho de compras.
- Exibir o carrinho de compras e calcular valores totais.
- Registrar e editar o usuário.

---

## 📦 Tecnologias Utilizadas

- **[React](https://reactjs.org/)**: Biblioteca JavaScript para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que adiciona tipagem estática.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build ultrarrápida para desenvolvimento frontend.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilos rápidos e personalizados.
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)**: Ferramentas para manter consistência de código e qualidade.
- **[React Router](https://reactrouter.com/)** (navegação entre páginas).
- **[Axios](https://axios-http.com/)** (caso utilizado para requisições HTTP).

---

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/dkrausz/loja-roupa-front.git
   ```

2. **Navegue até o diretório do projeto**

   ```bash
   cd loja-roupa-front
   ```

3. **Instale as dependências**

   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173` ou conforme indicado no terminal.

---

## 🌐 Implantação (Deployment)

Este projeto está configurado para ser implantado facilmente em plataformas como **Vercel** ou **Netlify**.

- O arquivo `vercel.json` contém as configurações necessárias para implantação automática no Vercel.
- Após configurar no painel da plataforma, basta indicar o repositório e a branch `main` para deploy contínuo.

---

## 🛠 Funcionalidades Principais

- **Home Page**: Exibe uma seleção de produtos em destaque e categorias.
- **Listagem de Produtos**: Mostra todos os produtos disponíveis com paginação ou filtros.
- **Detalhes do Produto**: Exibe informações completas do produto, como galeria de imagens, descrição detalhada e botão “Adicionar ao Carrinho”.
- **Filtro de Produtos**: Filtra os produtos confrome os filtros selecionados.
- **Carrinho de Compras**: Lista de itens selecionados, cálculo do total do pedido e funcionalidade para remover ou alterar a quantidade de produtos.
- **Navegação**: Barra de navegação com links para as páginas principais (Home, Categorias, Carrinho, etc.).
- **Registro e edição de usuário**: Registro completo de usuário, com mais de um endereço, editar e deletar.

> **Observação:** Dependendo da implementação atual, algumas funcionalidades podem estar pendentes ou em desenvolvimento. Ajuste conforme a lógica de estado e gerenciamento de dados implementada (por exemplo, Context API, Redux ou criação de mocks).

## 🔐 Notar que o backEnd não está rodando!!

---

## 💡 Boas Práticas e Linters

- O projeto utiliza **ESLint** com regras específicas para React e TypeScript, garantindo a qualidade do código.
- **Prettier** é utilizado para formatação automática de acordo com padrões definidos em `.prettierrc`.
- **Tailwind CSS** é configurado em `tailwind.config.js`, permitindo personalização das classes utilitárias.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🧑‍💻 Autor

- **Danilo Krausz** – [@dkrausz](https://github.com/dkrausz)

---
