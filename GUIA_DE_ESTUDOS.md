# Guia de Estudos — Contact Manager

## Visão Geral do Projeto

O **Contact Manager** é um sistema completo para cadastro, edição, exclusão e visualização segura de contatos. Ele foi desenvolvido com **React + Vite** no frontend e **NestJS + Prisma** no backend, utilizando boas práticas de autenticação, criptografia e organização de código.

---

## Como o Projeto Foi Criado — Passo a Passo

### 1. Criação do Frontend (React + Vite)

O frontend foi criado usando o Vite, que é uma ferramenta moderna para inicializar projetos React rapidamente.

```bash
npm create vite@latest client -- --template react-ts
```
- **Por que?** O Vite oferece recarregamento rápido e integração nativa com TypeScript, ideal para projetos modernos.

Depois, instalamos as dependências essenciais:
```bash
cd client
npm install
npm install @mui/material @emotion/react @emotion/styled axios
```
- **Material UI:** Biblioteca de componentes visuais prontos e responsivos.
- **Axios:** Cliente HTTP para consumir a API do backend.

### 2. Criação do Backend (NestJS + Prisma)

O backend foi criado com NestJS, um framework Node.js para aplicações escaláveis.

```bash
npm i -g @nestjs/cli
nest new server
```
- **Por que?** O NestJS organiza o código em módulos, controllers e services, facilitando a manutenção e escalabilidade.

No backend, instalamos o Prisma (ORM) e outras dependências:
```bash
cd server
npm install @prisma/client prisma
npm install bcryptjs @nestjs/jwt passport-jwt @nestjs/passport passport
npm install dotenv
```
- **Prisma:** ORM para manipulação do banco de dados de forma segura e tipada.
- **bcryptjs:** Para criptografar senhas.
- **JWT e Passport:** Para autenticação segura.
- **dotenv:** Para gerenciar variáveis de ambiente.

### 3. Configuração do Banco de Dados (PostgreSQL)

O banco de dados utilizado foi o **PostgreSQL**.  
No arquivo `.env` do backend, configuramos a conexão:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/contactmanager"
```

Para criar o banco e as tabelas, usamos o Prisma:

```bash
npx prisma init
```
- Isso cria a pasta `/prisma` e o arquivo `schema.prisma`.

Editamos o `schema.prisma` para definir os modelos (User, Contact, etc).

Depois, criamos as tabelas no banco com:
```bash
npx prisma migrate dev --name init
```
- **Por que?** O comando cria as tabelas conforme o schema e gera um histórico das alterações.

Para visualizar e editar dados facilmente:
```bash
npx prisma studio
```

### 4. Estrutura de Pastas

#### Backend (NestJS)
```
server/
├── src/
│   ├── auth/         # Autenticação (JWT, guards)
│   ├── contacts/     # Controller, service e DTOs dos contatos
│   ├── prisma/       # Serviço de acesso ao banco (Prisma)
│   └── utils/
│       └── encryption/ # Serviço de criptografia e descriptografia
├── prisma/           # Schema e migrations do banco
```

#### Frontend (React + Vite)
```
client/
├── src/
│   ├── components/   # Componentes reutilizáveis (modais, tabelas, etc)
│   ├── pages/        # Páginas principais (Contacts, Login, Register)
│   ├── assets/       # Imagens e arquivos estáticos
│   └── App.tsx       # Componente principal
```

---

## Conceitos Importantes

### Diferença entre Controller, Service e Module (NestJS)

- **Controller:** Recebe as requisições HTTP, valida dados e chama o service. Exemplo: `contacts.controller.ts`.
- **Service:** Onde fica a lógica de negócio, como salvar, buscar, atualizar e remover contatos. Exemplo: `contacts.service.ts`.
- **Module:** Agrupa controllers e services relacionados, facilitando a organização e a injeção de dependências. Exemplo: `contacts.module.ts`.

### Components e Pages (React)

- **Components:** São blocos reutilizáveis de interface, como botões, modais, tabelas. Exemplo: `ContactModal.tsx`, `ContactsTable.tsx`.
- **Pages:** São telas completas, geralmente associadas a rotas, como `/contacts`, `/login`. Exemplo: `Contacts.tsx`.

---

## Comandos Úteis

- **Iniciar o frontend:**  
  `cd client && npm run dev`
- **Iniciar o backend:**  
  `cd server && npm run start:dev`
- **Rodar migrations do banco:**  
  `cd server && npx prisma migrate dev`
- **Visualizar banco com Prisma Studio:**  
  `cd server && npx prisma studio`

---

## Fluxo Seguro de Visualização de Dados

1. **Listagem:**  
   Ao acessar a lista de contatos, os campos de telefone e e-mail aparecem mascarados (`************`).
2. **Desbloqueio:**  
   Ao clicar no cadeado e informar a senha, o backend valida a senha e retorna os dados descriptografados apenas daquele contato.
3. **Segurança:**  
   Os dados sensíveis nunca são enviados abertamente sem autenticação e autorização.

---

## Regras de Negócio: Usuário x Contatos

No Contact Manager, é importante entender a separação entre **cadastro de usuário** (login) e **cadastro de contatos**:

- **Usuário (UserID):**  
  Cada pessoa que acessa o sistema precisa criar uma conta (login e senha).  
  O usuário recebe um identificador único (`userId`).  
  Todas as ações (criar, editar, deletar contatos) ficam associadas a esse `userId`.

- **Contatos:**  
  Cada contato cadastrado (nome, telefone, e-mail, tipo, avatar) pertence a um usuário específico.  
  Ou seja, **cada usuário só vê e gerencia sua própria lista de contatos**.  
  Não é possível acessar, editar ou visualizar contatos de outros usuários.

**Resumo:**  
O cadastro/login é para o usuário acessar o sistema.  
O cadastro de contatos é feito dentro do sistema, e cada contato pertence a um usuário específico.

---

## Testes de Rotas e Banco de Dados

Durante o desenvolvimento, testamos as rotas da API diretamente pelo terminal usando ferramentas como **curl** ou **HTTPie**.  
Esses testes garantem que as operações de criar, atualizar, deletar e listar contatos funcionam corretamente e que a segurança está sendo respeitada.

### Exemplos de Testes via Linha de Comando

#### 1. Criar um contato

```bash
curl -X POST http://localhost:3000/contacts \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@email.com","phone":"(11)99999-8888","type":"Colega"}'
```

#### 2. Listar contatos do usuário logado

```bash
curl -X GET http://localhost:3000/contacts \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>"
```

#### 3. Atualizar um contato

```bash
curl -X PUT http://localhost:3000/contacts/1 \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"João da Silva","type":"Trabalho"}'
```

#### 4. Deletar um contato

```bash
curl -X DELETE http://localhost:3000/contacts/1 \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>"
```

#### 5. Desbloquear (visualizar) um contato

```bash
curl -X POST http://localhost:3000/contacts/1/unlock \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"password":"suaSenha"}'
```

### Observações Didáticas

- **Cada rota exige autenticação:** O token JWT do usuário deve ser enviado no header Authorization.
- **Assegurando o isolamento:** Só é possível manipular contatos do próprio usuário.
- **Banco de dados:** Todas as operações refletem imediatamente no banco PostgreSQL, e podem ser conferidas usando o Prisma Studio.

---

> Este guia foi criado para ajudar no entendimento do projeto e das melhores práticas de desenvolvimento fullstack com React, NestJS e Prisma.  
> Bons estudos!