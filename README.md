# Hopion API

API Node.js com TypeScript seguindo arquitetura DDD (Domain-Driven Design).

## 🏗️ Estrutura do Projeto

```
src/
├── domain/                 # Camada de domínio
│   ├── entities/          # Entidades do domínio
│   ├── repositories/      # Interfaces dos repositórios
│   └── services/          # Interfaces dos serviços de domínio
├── application/           # Camada de aplicação
│   └── use-cases/        # Casos de uso
├── infrastructure/        # Camada de infraestrutura
│   ├── repositories/     # Implementações dos repositórios
│   ├── services/         # Implementações dos serviços
│   └── http/            # Configuração HTTP
└── presentation/         # Camada de apresentação
    ├── controllers/     # Controladores
    ├── requests/       # DTOs de entrada
    ├── responses/      # DTOs de saída
    ├── routes/        # Rotas
    └── middlewares/   # Middlewares
```

## 🚀 Como usar

### Instalação

```bash
cd hopion-api
npm install
```

### Configuração

Crie um arquivo `.env` baseado no `.env.example`:

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
npm run dev
```

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express
- Zod (validação)
- MailerSend (envio de emails)
- ESM (import/export)

## 📝 Boas Práticas

- ✅ Arquitetura DDD
- ✅ SOLID principles
- ✅ Dependency Injection
- ✅ Validação com Zod
- ✅ TypeScript strict mode
- ✅ ESM modules (import/export)
- ✅ Error handling
