# FieldHub — Instruções para o Claude Code

## O que é este projeto

FieldHub é um sistema de gestão IoT agrícola construído como monolito Next.js.
Ele conecta sensores ESP32 (temperatura, umidade do solo, geração solar) a um
dashboard web via protocolo MQTT. O agricultor monitora lotes em tempo real e
aciona a irrigação manualmente ou de forma automática por threshold de umidade.

Este é um projeto acadêmico (ADS). O código precisa ser legível para pessoas que
ainda estão aprendendo React. Clareza e simplicidade valem mais do que sofisticação.

---

## Arquitetura

Next.js é o sistema inteiro. Não existe backend separado.

```
ESP32 (Wokwi)
  → publica MQTT
  → lib/mqtt.ts           ← subscriber rodando no servidor Next.js
  → app/api/telemetry/    ← salva leitura no banco
  → lib/db.ts → SQLite

Browser
  → services/             ← faz fetch para /api/
  → app/api/readings/     ← busca dados do banco
  → lib/db.ts → SQLite
  → hook                  ← orquestra estado
  → componente            ← só renderiza

Usuário clica em ligar irrigação
  → componente → hook → services/
  → app/api/command/
  → lib/mqtt.ts           ← publica comando no HiveMQ
  → ESP32 aciona LED
```

A `lib/` roda exclusivamente no servidor. Nunca é importada por componentes,
hooks ou services. Só as API Routes tocam nela.

---

## Estrutura de pastas

Crie exatamente esta estrutura. Não adicione pastas além das listadas.

```
fieldhub/
├── app/
│   ├── api/
│   │   ├── telemetry/
│   │   │   └── route.ts
│   │   ├── readings/
│   │   │   └── route.ts
│   │   ├── command/
│   │   │   └── route.ts
│   │   └── history/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── hooks/
├── services/
├── lib/
│   ├── mqtt.ts
│   ├── db.ts
│   ├── utils.ts
│   └── types.ts
└── public/
```

### O que cada pasta contém

**`lib/`** — lado servidor. Nunca importado pelo browser.
- `mqtt.ts` — conexão singleton ao HiveMQ via MQTT TLS. Exporta `publish(topic, payload)` e inicializa o subscriber ao ser importado pela primeira vez.
- `db.ts` — inicializa o SQLite com `better-sqlite3`. Cria as tabelas se não existirem. Exporta a instância `db`.
- `types.ts` — tipos TypeScript compartilhados entre servidor e cliente (ex: `SensorReading`, `IrrigationLog`, `CommandPayload`).
- `utils.ts` — funções utilitárias puras (ex: `formatDate`, `cn` para classnames).

**`app/api/`** — ponte entre browser e servidor. Cada route só faz uma coisa.
- `telemetry/route.ts` — POST. Recebe payload do MQTT subscriber e insere em `sensor_readings`.
- `readings/route.ts` — GET. Retorna as últimas leituras de `sensor_readings`.
- `command/route.ts` — POST. Recebe `{ action: 'ON' | 'OFF' }` e publica no tópico MQTT `irrigacao/comando`.
- `history/route.ts` — GET. Aceita query param `?period=24h|7d|30d|90d` e retorna histórico filtrado.

**`services/`** — lado cliente. Só faz `fetch`. Sem estado, sem lógica de negócio.
- Cada função chama uma rota de `/api/` e retorna o JSON.
- Nenhum `useState` ou `useEffect` aqui.

**`hooks/`** — orquestração de estado. Usa os services, controla polling, expõe dados para os componentes.
- Nenhum `fetch` direto aqui — tudo passa pelo service.
- O que o componente não precisa saber não é exposto.

**`components/ui/`** — componentes sem consciência de domínio. Botão, card, badge, input. Recebem tudo por props. Não importam hooks nem services.

**`components/layout/`** — shell da aplicação. Bottom navigation, header. Toca em roteamento Next.js.

**`components/features/`** — componentes com consciência de domínio. `SensorCard`, `IrrigationControl`. Importam hooks. São o ponto de encontro entre UI e produto.

---

## Regra de dependência

O fluxo de importação anda em uma direção só:

```
componente → hook → service → /api/ → lib/
```

Nunca na direção contrária. Se um componente estiver importando um service
diretamente, está errado. Se um service estiver importando um hook, está errado.
Se qualquer coisa no browser estiver importando `lib/`, está errado.

---

## Banco de dados (SQLite)

Crie as tabelas no `lib/db.ts` com este schema exato:

```sql
CREATE TABLE IF NOT EXISTS sensor_readings (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  temperature REAL,
  humidity    REAL,
  lux         REAL,
  recorded_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS irrigation_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  action     TEXT,
  trigger    TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
```

`action` aceita `'ON'` ou `'OFF'`.
`trigger` aceita `'manual'` ou `'auto'`.

---

## MQTT

Broker: HiveMQ Cloud, conexão TLS na porta 8883.

Tópicos:

| Tópico               | Publisher | Subscriber | Payload                                        |
|----------------------|-----------|------------|------------------------------------------------|
| `irrigacao/sensores` | ESP32     | Next.js    | `{"temperature":24.5,"humidity":62,"lux":840}` |
| `irrigacao/comando`  | Next.js   | ESP32      | `"ON"` ou `"OFF"`                              |

O `lib/mqtt.ts` deve:
1. Criar uma conexão singleton (uma única vez durante o ciclo de vida do servidor).
2. Subscrever `irrigacao/sensores` ao inicializar.
3. Ao receber mensagem, fazer POST interno em `/api/telemetry`.
4. Exportar `publish(topic: string, payload: string)` para uso nas API Routes.

Credenciais vêm exclusivamente de variáveis de ambiente. Nunca hardcoded.

```env
MQTT_HOST=
MQTT_PORT=8883
MQTT_USER=
MQTT_PASS=
```

---

## O que não criar

Não crie as seguintes pastas — elas não existem neste projeto:

- `store/` — sem gerenciamento de estado global
- `contexts/` — sem React Context no MVP
- `middleware.ts` — sem autenticação no MVP
- `prisma/` — sem ORM, usar `better-sqlite3` direto

Se sentir necessidade de criar algo fora da estrutura definida, pergunte antes.

---

## Convenções de código

- TypeScript em todos os arquivos.
- Nenhum `any`. Se o tipo não for óbvio, definir em `lib/types.ts`.
- Componentes em PascalCase. Funções e arquivos em camelCase. Pastas em kebab-case.
- API Routes retornam sempre `{ data }` em sucesso e `{ error }` em falha, com o HTTP status correto.
- Nenhum `console.log` em produção — usar apenas durante desenvolvimento e remover antes do merge.

---

## Como começar

1. Criar a estrutura de pastas conforme definido acima.
2. Criar `lib/types.ts` com os tipos base (`SensorReading`, `IrrigationLog`, `CommandPayload`).
3. Criar `lib/db.ts` com a inicialização do SQLite e as tabelas.
4. Criar `lib/mqtt.ts` com a conexão singleton e o subscriber.
5. Criar as quatro API Routes como stubs funcionais.
6. Criar `services/irrigationService.ts` com as funções de fetch.
7. Criar `hooks/useIrrigation.ts` com o polling e o controle de estado.
8. Limpar `app/page.tsx` e `app/globals.css` do conteúdo padrão do Next.js.
9. Remover todos os SVGs padrão da pasta `public/`.
