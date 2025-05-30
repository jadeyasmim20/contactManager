<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Contact Manager - Backend

Este é o backend do projeto **Contact Manager**, desenvolvido em **NestJS** com **TypeScript** e **Prisma ORM**.

## Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- Gerenciamento de contatos (CRUD)
- Criptografia de dados sensíveis (e-mail e telefone)
- Upload de avatar para contatos
- Integração com banco de dados via Prisma

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` na raiz do `server` (exemplo de variáveis: `DATABASE_URL`, `JWT_SECRET`, `ENCRYPTION_KEY`).
3. Execute as migrations do Prisma:
   ```bash
   npx prisma migrate deploy
   ```
4. Inicie o servidor:
   ```bash
   npm run start:dev
   ```
   O backend estará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts úteis

- `npm run start:dev` — inicia o servidor em modo desenvolvimento
- `npm run start:prod` — inicia o servidor em modo produção
- `npm run test` — executa os testes unitários
- `npm run test:e2e` — executa os testes end-to-end
- `npm run test:cov` — gera o relatório de cobertura de testes
- `npx prisma studio` — abre o Prisma Studio para visualizar o banco de dados

## Estrutura de pastas

- `src/auth`: Módulo de autenticação
- `src/contacts`: Módulo de contatos
- `src/prisma`: Serviço de acesso ao banco de dados
- `src/utils/encryption`: Serviço de criptografia
- `prisma/`: Migrations e schema do Prisma

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Dicas de desenvolvimento

- O frontend espera que a API esteja rodando em `http://localhost:3000`.
- Nunca suba seu arquivo `.env` para repositórios públicos.
- Para rodar em produção, configure corretamente as variáveis de ambiente e o banco de dados.

---

> Projeto desenvolvido para fins de estudo e demonstração de boas práticas com NestJS, Prisma e autenticação JWT.
