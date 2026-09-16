# Desenvolvimento

## Pré-requisitos

- Java 25
- Node.js LTS e npm
- Docker Desktop (necessário para PostgreSQL local)

Copie `.env.example` para `.env` e ajuste somente valores locais. Nunca versione `.env` ou tokens.

## Plano de implementação

1. **Fase 0 — Arquitetura:** estrutura, decisões, documentação e plano.
2. **Fase 1 — Infraestrutura:** Spring Boot, Flyway, PostgreSQL, erro global, healthcheck, Expo, tema e cliente HTTP.
3. **Fase 2 — Autenticação:** cadastro, login, refresh rotation, logout, `me` e telas protegidas.
4. **Fase 3 — Onboarding:** perfil nutricional e fluxo pós-cadastro.
5. **Fase 4 — Rotina:** home agregada, check-ins e progresso.
6. **Fase 5 — Conteúdo:** cursos, aulas, receitas e favoritos.
7. **Fase 6 — Planejamento:** alimentos, plano, lista de compras e substituições determinísticas.
8. **Fase 7 — IA:** provider mock, segurança, respostas estruturadas e assistente.
9. **Fase 8 — Comunidade:** salas, histórico, STOMP, denúncia e bloqueio.
10. **Fase 9 — Premium:** conversa profissional, disponibilidade, consultas e revisão de planos.
11. **Fase 10/11:** assinaturas mock, hardening, testes e revisão de segurança.

Após cada fase, serão executadas as verificações aplicáveis e as mudanças serão commitadas e enviadas ao repositório remoto.

## Comandos (ao fim da Fase 1)

```powershell
docker compose up -d
cd backend; .\mvnw spring-boot:run
cd mobile; npm install; npx expo start
```

Verificações da Fase 1:

```powershell
cd backend; .\mvnw.cmd test
cd mobile; npm run typecheck; npm run lint
```

## Desenvolvimento sem serviços externos

`AI_PROVIDER=mock`, `SUBSCRIPTION_PROVIDER=mock` e `STORAGE_PROVIDER=local` garantem que a aplicação funcione localmente. Dados de seed terão uso exclusivo no perfil `dev`.

## Convenções

- Código em inglês; interface em português do Brasil.
- Timestamps armazenados em UTC e apresentados no fuso local.
- Paginação em listas potencialmente grandes.
- DTOs em APIs; entidades JPA não são expostas.
