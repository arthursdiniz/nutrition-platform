# Nutrition Platform

Base monorepo para uma plataforma mobile de acompanhamento nutricional. O produto combina educação, planejamento alimentar, progresso, comunidade e acompanhamento profissional, mantendo as regras de negócio no backend.

## Estrutura

```text
backend/  # API Spring Boot modular
mobile/   # Aplicativo Expo / React Native
docs/     # Arquitetura, desenvolvimento e decisões
```

## Estado atual

Fase 0 concluída: arquitetura, decisões iniciais e plano de implementação documentados. A infraestrutura será adicionada na Fase 1.

## Princípios

- Monólito modular por feature, sem microserviços prematuros.
- Dados de saúde tratados como sensíveis; não registrar PII ou dados clínicos em logs.
- Mobile consome somente a API; integrações de IA, pagamento, vídeo e armazenamento passam pelo backend e possuem mocks locais.
- Migrations Flyway são a fonte de verdade para o esquema do banco.

Consulte [architecture.md](docs/architecture.md) e [development.md](docs/development.md) para as decisões e o plano.
