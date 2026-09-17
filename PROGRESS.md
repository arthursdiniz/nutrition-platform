# Progresso do projeto

## Fase atual

**Fase 3 — Onboarding e perfil nutricional**

## Objetivo da fase

Permitir que uma pessoa autenticada informe um perfil nutricional em etapas e que o aplicativo encaminhe usuários sem perfil ao onboarding, enquanto usuários com perfil completo seguem para a Home.

## Checklist

- [x] Criar migration e domínio inicial de perfil nutricional.
- [x] Criar API protegida para consultar e salvar o perfil do próprio usuário.
- [x] Impedir acesso a perfis de terceiros.
- [x] Implementar fluxo de onboarding em etapas no Expo.
- [ ] Encaminhar sessão autenticada conforme completude do perfil.
- [x] Tratar estados de carregamento, erro e opção de não informar campos opcionais.
- [x] Testar backend, TypeScript, lint e integração local com PostgreSQL.

## Itens concluídos

- A Fase 2 foi enviada no commit `2f96b40`.
- A migration `V3__create_nutrition_profile.sql` e a entidade `NutritionProfile` foram iniciadas nesta fase, mas ainda não foram validadas nem commitadas.

## Item em andamento

Adicionar recuperação de refresh token e decisão inicial de rota no aplicativo.

## Arquivos relevantes alterados

- `backend/src/main/resources/db/migration/V3__create_nutrition_profile.sql`
- `backend/src/main/java/com/nutritionplatform/nutritionprofile/domain/NutritionProfile.java`
- `backend/src/main/java/com/nutritionplatform/nutritionprofile/repository/NutritionProfileRepository.java`
- `backend/src/main/java/com/nutritionplatform/nutritionprofile/dto/NutritionProfileRequest.java`
- `backend/src/main/java/com/nutritionplatform/nutritionprofile/service/NutritionProfileService.java`
- `backend/src/main/java/com/nutritionplatform/nutritionprofile/controller/NutritionProfileController.java`
- `mobile/src/app/onboarding.tsx`
- `mobile/src/services/api/client.ts`
- `mobile/src/stores/session-store.ts`

## Testes executados

- `backend/.mvnw.cmd test` — passou.
- `mobile/npm run typecheck` — passou.
- `mobile/npm run lint` — passou com um aviso existente do Axios.

## Erros ou bloqueios

- Nenhum bloqueio ativo.

## Próximo passo exato

Fase concluída; preparar commit e push.
