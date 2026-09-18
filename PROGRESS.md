# Progresso do projeto

## Fase atual

**Fase 4 — Home, check-in e progresso**

## Objetivo da fase

Entregar uma Home "Hoje" útil, check-in diário, registros de peso e medidas e visualização de progresso baseada em dados reais do usuário autenticado.

## Checklist

- [x] Criar migrations e APIs protegidas para check-ins, peso e medidas.
- [x] Criar endpoint agregado `GET /api/v1/home`.
- [x] Implementar Home "Hoje" no Expo com estados loading, erro e vazio.
- [x] Implementar formulários de check-in, peso e medidas.
- [x] Exibir progresso com gráficos simples e linguagem além do peso.
- [x] Validar autorização, migrations, backend, TypeScript, lint e integração local.

## Itens concluídos

- Fase 3 concluída e enviada no commit `40bf0ac`.

## Item em andamento

Fase concluída; preparar commit e push.

## Arquivos relevantes alterados

- `backend/src/main/resources/db/migration/V4__create_progress_tables.sql`
- `backend/src/main/java/com/nutritionplatform/progress/`
- `backend/src/main/java/com/nutritionplatform/home/controller/HomeController.java`
- `mobile/src/app/index.tsx`, `mobile/src/app/checkin.tsx`, `mobile/src/app/progress.tsx`

## Testes executados

- Backend: `mvnw.cmd test` — passou.
- Mobile: `npm run typecheck` e `npm run lint` — passaram.
- Tendência de peso: `GET /api/v1/progress/weights` integrado ao gráfico simples no Expo.

## Erros ou bloqueios

- Nenhum bloqueio ativo.

## Próximo passo exato

Commitar e enviar a Fase 4; não iniciar a Fase 5 automaticamente.
