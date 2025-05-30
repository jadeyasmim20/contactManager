# Contact Manager - Frontend

Este é o frontend do projeto **Contact Manager**, desenvolvido em **React + TypeScript + Vite**.

## Funcionalidades

- Cadastro e autenticação de usuários
- Listagem, criação, edição e remoção de contatos
- Busca e filtragem de contatos
- Upload de avatar para contatos
- Interface responsiva e moderna com Material UI

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz do `client` se necessário (exemplo: para variáveis de API).
3. Inicie o projeto:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Estrutura de pastas

- `src/components`: Componentes reutilizáveis (modais, formulários, etc)
- `src/pages`: Páginas principais (Login, Register, Contacts)
- `src/assets`: Imagens e arquivos estáticos

## Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)

## Dicas de desenvolvimento

- O backend deve estar rodando em `http://localhost:3000` por padrão.
- As variáveis de ambiente podem ser configuradas em `.env`.

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção
- `npm run preview` — visualiza a build de produção localmente

---

> Projeto desenvolvido para fins de estudo e demonstração de boas práticas com React, Vite e Material UI.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
