# Fastify API Template

Este é um template básico para uma API desenvolvida com **Fastify**, com suporte a **Zod** para validação de dados. O código foi desenvolvido por **wwwgostozin**, mas boa parte dele foi criado por **rincko dev**.

## Sistema de Rotas

O sistema de rotas do Fastify neste template usa a biblioteca **autoload** para carregar as rotas automaticamente a partir de arquivos dentro do diretório `routes`. A estrutura de pastas dentro de `routes` define como as rotas serão registradas na API.

### Como Funciona

- **`startServer`**: Função principal que inicializa o servidor Fastify e configura os middlewares, incluindo o tratamento de erros com Zod.
- **`defineRoutes`**: Função auxiliar para definir rotas. A função é usada para encapsular as rotas dentro de um módulo que será carregado automaticamente pelo **autoload**.
- **`autoload`**: A biblioteca que carrega automaticamente as rotas a partir de arquivos no diretório `routes` com base na estrutura de pastas.

### Estrutura de Rotas

O sistema de rotas permite que você organize as rotas em subpastas e defina o caminho delas de maneira hierárquica. Por exemplo:

- Se você criar a seguinte estrutura de pastas e arquivos dentro de `routes`:

```routes/
│
└───users/
    │   routes.ts
```
O arquivo `routes.ts` dentro da pasta `users` será automaticamente registrado e ficará acessível na rota `/users`.

### Exemplo de como adicionar uma rota:

```ts
// src/routes/users/routes.ts
import { FastifyInstance } from 'fastify';
import { defineRoutes } from '#app';

export default defineRoutes((app: FastifyInstance) => {
  // A rota será registrada como /users/
  app.get('/', async (request, reply) => {
    return { message: 'Welcome to the users endpoint!' };
  });
});
```

Com essa estrutura, o Fastify automaticamente registrará a rota /users para você. Esse comportamento é possível porque a pasta users dentro de routes/ define o prefixo da URL para as rotas dentro dela.

Como adicionar mais rotas dentro de uma subpasta
Você pode criar subpastas dentro de routes e elas serão registradas automaticamente. Por exemplo, se você adicionar outra subpasta admin dentro de routes/users/, as rotas nela serão registradas sob /users/admin.

```ts
// src/routes/users/admin/routes.ts
import { FastifyInstance } from 'fastify';
import { defineRoutes } from '#app';

export default defineRoutes((app: FastifyInstance) => {
  // A rota será registrada como /users/admin
  app.get('/', async (request, reply) => {
    return { message: 'Welcome to the admin area!' };
  });
});
```

Agora, a API terá a seguinte estrutura de rotas:

/users/ — Rota definida no primeiro exemplo.
/users/admin/ — Rota definida no segundo exemplo.
Exemplo de como adicionar uma rota com validação Zod:

```ts

// src/routes/users/submit.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { defineRoutes } from '#app';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Age must be at least 18"),
});

export default defineRoutes((app: FastifyInstance) => {
  app.post('/submit', async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Invalid data",
        errors: parsed.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    // Process the valid data
    return reply.status(200).send({ message: 'Data received successfully' });
  });
});
```

Tratamento de Erros com Zod
Para lidar com erros de validação Zod de maneira centralizada, utilize o manipulador de erros customizado.

Instalação
Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
Instale as dependências:

```bash
npm install
```
Execute o servidor:

```bash
npm run dev
```