# Duett Auth Web

Interface web do sistema **Duett Auth**, responsável pelo fluxo completo de autenticação, gerenciamento de usuários e painel administrativo.

O frontend consome a **Duett Auth API** e implementa autenticação baseada em **JWT**, proteção de rotas e controle de acesso por perfil (**USER / ADMIN**).

---

# 🔹 Tecnologias

## Frontend

- React
- Vite
- React Router
- Axios

## Segurança

- JWT Authentication
- Axios Interceptors
- Protected Routes
- Token persistence

## Validação

- Validação de formulários
- Máscara de CPF
- Tratamento de erros da API

---

# 🔹 Funcionalidades

## Autenticação

Login com **JWT**

- Persistência de token
- Redirecionamento automático para dashboard
- Tratamento de erros de autenticação

---

## Cadastro de Usuário

Formulário completo com:

- Nome
- Email
- CPF com máscara
- Senha
- Confirmação de senha

Validações implementadas:

- Campos obrigatórios
- Formato de CPF
- Confirmação de senha
- Tratamento de erros retornados pela API

---

## Dashboard do Usuário

Página autenticada que exibe:

- Nome do usuário
- Email
- Perfil (USER ou ADMIN)

Funcionalidades disponíveis:

- Logout
- Acesso ao painel administrativo (para ADMIN)

---

## Alteração de Senha

Fluxo completo de troca de senha:

- Confirmação da senha atual
- Validação da nova senha
- Confirmação da nova senha
- Feedback de erro da API

---

## Painel Administrativo

Área exclusiva para usuários **ADMIN**

Permite:

- Listar usuários cadastrados
- Criar novos administradores
- Excluir usuários

Inclui:

- Modal de criação de admin
- Validações de formulário
- Tratamento de erros da API

---

# 🔹 Segurança no Frontend

O projeto implementa práticas importantes usadas em aplicações reais.

## JWT Persistence

O token é armazenado no navegador e utilizado automaticamente nas requisições autenticadas.

---

## Axios Interceptor

Centralização da autenticação nas requisições HTTP.

Responsável por:

- Adicionar automaticamente o **Authorization Header**
- Manter o código desacoplado
- Evitar repetição de lógica de autenticação

---

## Protected Routes

Rotas privadas são protegidas por um **Auth Guard**.

Usuários não autenticados são automaticamente redirecionados para:
