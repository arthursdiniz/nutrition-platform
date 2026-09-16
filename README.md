# Nutrition Platform

Base monorepo para uma plataforma mobile de acompanhamento nutricional. O produto combina educação, planejamento alimentar, progresso, comunidade e acompanhamento profissional, mantendo as regras de negócio no backend.

## Estrutura

```text
backend/  # API Spring Boot modular
mobile/   # Aplicativo Expo / React Native
docs/     # Arquitetura, desenvolvimento e decisões
```

## Estado atual

Fases 0 e 1 concluídas: arquitetura documentada, PostgreSQL via Compose, API Spring Boot 4.1 com Flyway, healthcheck e erro global, além do app Expo SDK 55 com TypeScript estrito, tema e cliente HTTP centralizado.

O PostgreSQL do projeto usa a porta `5433` no host para não conflitar com serviços locais já vinculados à porta `5432`.

## Princípios

- Monólito modular por feature, sem microserviços prematuros.
- Dados de saúde tratados como sensíveis; não registrar PII ou dados clínicos em logs.
- Mobile consome somente a API; integrações de IA, pagamento, vídeo e armazenamento passam pelo backend e possuem mocks locais.
- Migrations Flyway são a fonte de verdade para o esquema do banco.

Consulte [architecture.md](docs/architecture.md) e [development.md](docs/development.md) para as decisões e o plano.
