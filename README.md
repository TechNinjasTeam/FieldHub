# FieldHub — Plataforma de Integração IoT para Irrigação Agrícola

> Sistema de integração IoT com dispositivos embarcados no campo, desenvolvido como projeto acadêmico de ADS (Análise e Desenvolvimento de Sistemas) — Facens 2026

---

## O que é

FieldHub é uma plataforma web para monitoramento e controle remoto de irrigação agrícola. O agricultor acessa o sistema pelo celular ou computador e consegue, em tempo real:

- Ver a **umidade do solo**, temperatura e luminosidade captadas por sensores no campo
- **Ligar e desligar a irrigação** manualmente com um clique
- Configurar a **irrigação automática** — o sistema dispara sozinho quando a umidade cai abaixo de um limite definido pelo usuário
- Consultar o **histórico** de irrigações e leituras das últimas horas, dias ou meses

---

## O problema que resolve

Agricultores precisam saber se o solo está seco ou úmido para decidir quando irrigar. Sem tecnologia, essa decisão depende de visita manual ao campo — o que consome tempo e frequentemente resulta em irrigação em excesso (desperdício de água) ou de menos (perda de colheita).

O FieldHub automatiza essa lógica: sensores medem o campo continuamente, o sistema toma a decisão (ou avisa o agricultor) e comanda o irrigador remotamente.

---

## Como funciona — visão geral

```
Sensor no campo → Internet → Servidor → Banco de dados → Tela do usuário
     ↑                                        ↓
     └──────── Comando de irrigação ←─────────┘
```

1. Um microcontrolador **ESP32** no campo coleta temperatura, umidade e luminosidade a cada poucos segundos
2. Os dados viajam pela internet usando o protocolo **MQTT** (padrão industrial para IoT)
3. O servidor **Next.js** recebe os dados, salva no banco de dados e os exibe no dashboard
4. Quando o usuário clica "Ligar irrigador", o servidor envia um comando de volta ao ESP32, que aciona a válvula de irrigação

---

## Telas do sistema

| Tela | O que faz |
|------|-----------|
| **Início** | Status ao vivo dos dispositivos conectados, botão ligar/parar, leituras dos dispositivos |
| **Dados** | Gráfico histórico de umidade com indicador de threshold, dados de geração solar e vazão |
| **Perfil** | Configurações de automação, ajuste do limite de umidade, notificações e informações do usuário |

---

## Arquitetura técnica

O projeto é um **monolito Next.js** — um único repositório que contém tanto o servidor quanto o frontend. Isso simplifica o desenvolvimento e o deploy.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CAMPO                                    │
│  ESP32 + DHT22 (temp/umidade) + LDR (luz)                       │
│  Simulado no Wokwi (ambiente de prototipagem online)             │
└────────────────────────┬────────────────────────────────────────┘
                         │ MQTT sobre TLS (internet)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BROKER MQTT — HiveMQ Cloud                    │
│  Intermediário de mensagens. Recebe dados do sensor e repassa   │
│  ao servidor. Também distribui comandos do servidor ao ESP32.   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVIDOR — Next.js (Node.js)                   │
│                                                                  │
│  /api/telemetry  → recebe leitura do sensor, salva no banco     │
│  /api/readings   → devolve últimas leituras ao dashboard        │
│  /api/command    → envia ON/OFF ao ESP32 via MQTT               │
│  /api/history    → retorna histórico filtrado por período       │
│                                                                  │
│  lib/mqtt.ts     → conexão singleton ao broker                  │
│  lib/db.ts       → banco de dados SQLite local                  │
└──────────┬────────────────────────────┬────────────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────┐        ┌──────────────────────────────────┐
│  SQLite (banco)  │        │    Frontend — React + Tailwind   │
│                  │        │                                  │
│  sensor_readings │        │  Início · Dados · Perfil        │
│  irrigation_log  │        │  Polling automático a cada 10s  │
└──────────────────┘        └──────────────────────────────────┘
```

---

## Stack de tecnologias

| O que | Tecnologia | Por que escolhemos |
|-------|-----------|-------------------|
| Framework web | Next.js 16 | Une servidor e frontend em um só projeto |
| Linguagem | TypeScript | Erros pegos em tempo de desenvolvimento |
| Interface | React 19 + Tailwind CSS 4 | Componentização e estilização rápida |
| Banco de dados | SQLite (better-sqlite3) | Simples, sem servidor separado, ideal para MVP |
| Mensageria IoT | MQTT via HiveMQ Cloud | Protocolo leve, padrão para dispositivos IoT |
| Microcontrolador | ESP32 (simulado no Wokwi) | Hardware acessível, Wi-Fi nativo |
| Sensores | DHT22 (temp/umidade) + LDR (luz) | Precisão adequada para uso agrícola |
| Ícones | Lucide React | Biblioteca open-source consistente |

---

## Rodando localmente

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd fieldhub

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com as credenciais do HiveMQ

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000/inicio](http://localhost:3000/inicio)

### Variáveis de ambiente

```env
NEXT_PUBLIC_MQTT_HOST=seu-broker.hivemq.cloud
NEXT_PUBLIC_MQTT_PORT=8884
MQTT_USERNAME=seu-usuario
MQTT_PASSWORD=sua-senha
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Estrutura de pastas

```
fieldhub/
├── app/
│   ├── api/              # Rotas do servidor (telemetry, readings, command, history)
│   ├── inicio/           # Tela principal do dashboard
│   ├── dados/            # Tela de gráficos e histórico
│   └── perfil/           # Tela de configurações
├── components/
│   ├── features/         # Componentes com lógica (BottomNav)
│   └── ui/               # Componentes visuais reutilizáveis
├── hooks/                # useIrrigation (polling de dados)
├── services/             # irrigationService (fetch para API)
└── lib/                  # mqtt.ts · db.ts · types.ts
```

---

## Equipe

| Nome | Responsabilidade |
|------|-----------------|
| Gabriel Nunes Rodrigues| Next.js, MQTT, SQLite, API Routes, GitHub |
| Alexander Da Silva Fernandes | ESP32 no Wokwi, sensores DHT22 + LDR + LEDs |
| Lucas Panebianchi Antunes | Frontend: cards de sensor, controle de irrigação, gráficos |
| Moisés Ivanildo Ferreira | Layout Tailwind, navegação, responsividade mobile |
| Maria Eduarda Fernandes Filhik  | Documentação, README, organização do repositório |

---

## Escopo do MVP

O sistema atual cobre o ciclo completo: **sensor → internet → dashboard → comando → sensor**. Funcionalidades fora do escopo desta versão:

- Login e autenticação de usuários
- Gerenciamento de múltiplos lotes ou fazendas
- Aplicativo mobile nativo
- Exportação de relatórios em PDF

---

## Licença

Projeto acadêmico — Facens 2026. Todos os direitos reservados à equipe.
