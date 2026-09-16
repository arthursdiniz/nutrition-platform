# Arquitetura

## Visão

O sistema será um monorepo com um aplicativo Expo/React Native e uma API Spring Boot. A API é um monólito modular: cada domínio mantém seus controllers, serviços, DTOs e persistência próximos, enquanto os contratos HTTP ficam versionados em `/api/v1`.

```text
Expo mobile -> REST / WebSocket STOMP -> Spring Boot modular monolith -> PostgreSQL
                                           |-> adapters: AI, subscription, storage, video, notification
```

O aplicativo nunca conversa diretamente com fornecedores externos. O backend aplica autenticação, autorização, validação, segurança de IA e cálculo nutricional antes de usar adaptadores.

## Decisões registradas

### ADR-001 — Monólito modular

- **Decisão:** Uma única aplicação Spring Boot, organizada por feature.
- **Motivo:** reduz a complexidade operacional do MVP e preserva fronteiras claras para extrações futuras.
- **Alternativas:** microserviços e CQRS foram descartados por serem prematuros.

### ADR-002 — PostgreSQL e Flyway

- **Decisão:** PostgreSQL como banco principal e Flyway como única fonte de evolução de schema; Hibernate usa `validate`.
- **Motivo:** migrations reproduzíveis e sem alterações implícitas em produção.

### ADR-003 — Autorização centralizada por entitlement

- **Decisão:** `EntitlementService` será a única porta para recursos atrelados a assinatura.
- **Motivo:** evita verificações dispersas de planos e permite trocar o provedor de assinaturas sem reescrever regras.

### ADR-004 — IA isolada e segura

- **Decisão:** `AiProvider` será abstraído; `MockAiProvider` é o padrão local. Entradas passam por `AiSafetyService`, e saídas estruturadas são validadas antes de persistir.
- **Motivo:** o projeto roda sem credencial externa e não delega decisões clínicas nem cálculos nutricionais a um LLM.

### ADR-005 — Segurança e privacidade desde o núcleo

- **Decisão:** UUIDs públicos, DTOs, autenticação JWT com refresh-token rotativo, auditoria de eventos sensíveis e minimização de dados enviados à IA.
- **Motivo:** dados de saúde exigem controles técnicos fortes. Isto não substitui revisão jurídica/LGPD antes de produção.

## Módulos planejados

`auth`, `user`, `subscription`, `nutritionprofile`, `food`, `mealplan`, `recipe`, `course`, `progress`, `checkin`, `ai`, `community`, `chat`, `appointment`, `notification`, `moderation`, `storage` e `common`.

## Modelo inicial

O núcleo transversal contém `User`, `RefreshToken`, `Subscription`, `Consent` e `AuditEvent`. Os dados nutricionais são separados em `NutritionProfile`, `Food`, `FoodPortion`, `FoodNutrient`, `MealPlan` e seus itens. Todo acesso a dados de outro usuário deve ser validado no serviço, nunca inferido apenas por um identificador recebido do cliente.
