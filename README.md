# Stock-web

Sistema de Almoxarifado — React + TypeScript + Vite.

## Como rodar

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173/` e redireciona para `/login`.

Outros scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run preview`.

## Login (autenticação mockada)

Por enquanto o login valida contra usuários de exemplo em `src/mocks/users.ts`,
persistindo a sessão em `localStorage`. Senha para todas as contas: `123456`.

| Perfil | Matrícula ou e-mail | Senha |
|---|---|---|
| Servidor | `1873220` ou `ana.vieira@ifce.edu.br` | `123456` |
| Servidor | `2041188` ou `carlos.braga@ifce.edu.br` | `123456` |
| Administrador | `1904772` ou `marina.cavalcante@ifce.edu.br` | `123456` |

O provedor de autenticação está isolado em `src/api/auth/`. Para trocar
por uma API real no futuro, implemente `AuthService` (`src/types/auth.ts`)
num novo arquivo e aponte `src/api/auth/index.ts` para ele — nenhum
outro arquivo precisa mudar.

Após o login, `ProtectedRoute` (`src/app/ProtectedRoute.tsx`) garante que
só quem tem sessão válida acessa `/`, hoje renderizada por `src/pages/home/HomePage.tsx`
(uma landing simples só para confirmar sessão e logout).

## Estrutura do projeto

O `src/` segue uma estrutura em camadas fixas. Nem toda pasta tem conteúdo
hoje — só existem as que já são necessárias; as demais são a convenção a
seguir quando a necessidade aparecer:

| Pasta | Uso | Status |
|---|---|---|
| `api/` | Código que fala com a API (serviços, clients) | em uso (`api/auth/`) |
| `app/` | Rotas (`paths.ts`, `routes.tsx`, guards como `ProtectedRoute`) | em uso |
| `components/` | Componentes de UI reutilizáveis entre páginas | ainda não existe |
| `data/` | Arquivos que consomem a API e expõem estado/dados (contexts, hooks de dados) | em uso (`data/auth/`) |
| `lib/` | Formatters, mappers, utilitários puros | ainda não existe |
| `mocks/` | Dados mockados | em uso (`mocks/users.ts`) |
| `pages/` | Uma pasta por tela (`pages/<feature>/`) | em uso |
| `test/` | Testes | ainda não existe |
| `types/` | Entities e tipos do sistema | em uso (`types/auth.ts`) |

`App.tsx`, `main.tsx` e `styles/` ficam na raiz de `src/` como bootstrap da
aplicação e design system, fora dessa convenção de camadas.

## Adicionando novas telas

O projeto é construído por feature: não existem stubs ou telas pré-criadas
para funcionalidades futuras. Quando for implementar uma tela nova, declare o
path em `src/app/paths.ts` e adicione o objeto de rota em
`src/app/routes.tsx` — reaproveitando `ProtectedRoute` para exigir sessão,
e o design system em `src/styles/` (`tokens.css` + `components.css`, classes
`.btn`, `.field`/`.input`, `.card`, `.tag`, `.table`, `.dialog`, etc.).
