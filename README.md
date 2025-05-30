﻿# Contact Manager

![image](https://github.com/user-attachments/assets/a4d2674d-bd77-47f6-86a5-ee6017a8c3c0)


Gerencie seus contatos de forma segura e prática!  
Este repositório contém o frontend (React + Vite) e o backend (NestJS + Prisma) do projeto Contact Manager.

## Estrutura do projeto

```
/
├── client/   # Frontend React
├── server/   # Backend NestJS
```

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/jadeyasmim20/contactManager.git
cd contactManager
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```
Acesse [http://localhost:5173](http://localhost:5173)

### 3. Backend

```bash
cd server
npm install
npx prisma migrate deploy
npm run start:dev
```
A API estará em [http://localhost:3000](http://localhost:3000)

## Mais informações

- Veja instruções detalhadas em [`client/README.md`](client/README.md) e [`server/README.md`](server/README.md).

---

> Projeto desenvolvido para fins de estudo e demonstração de boas práticas com React, NestJS e Prisma.
