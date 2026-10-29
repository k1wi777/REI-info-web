# REI Web

> Sitio oficial de [REI Harness](https://github.com/k1wi777/REI-Harness): una web para entender, instalar y usar el arnés de **Spec Driven Development (SDD)** que coordina agentes de IA con aprobación humana.

[Repositorio de REI Harness](https://github.com/k1wi777/REI-Harness) · [Releases](https://github.com/k1wi777/REI-Harness/releases) · [Issues](https://github.com/k1wi777/REI-Harness/issues)

---

## Estado del proyecto

> **Web implementada, pendiente de publicación.** La home, el dossier de producto, la documentación, el visor y GitHub Issues ya tienen contenido propio y evidencia real. Queda cerrar SEO/Open Graph, `llms.txt`, CI y despliegue.

- La dirección visual, la navegación, la home, el producto y la documentación están implementados.
- El contenido es estático y versionado; no hay backend, base de datos, autenticación ni CMS.
- La evidencia del visor y de GitHub Issues es real y se regenera con `pnpm capture:evidence`.
- `pnpm test` cubre lógica y datos; `pnpm build` genera 36 rutas.
- No hay despliegue configurado ni dominio público.
- La versión de REI que documenta esta web es **v0.3.0** (26 de octubre de 2026). La fuente de verdad de versiones es [GitHub Releases](https://github.com/k1wi777/REI-Harness/releases).

Este README es también el contexto de referencia para la personalización inicial de REI (`/personalize`): describe el producto, el stack, la arquitectura y la verificación antes de que el Initializer complete `.rei/docs/project/*`.

---

## Estrategia de producto

La estrategia de producto y arquitectura de información del sitio —qué debe contar la web, para quién, cómo se organiza y cómo se ve— está en [`docs/product-strategy.md`](docs/product-strategy.md). Es la referencia de los Work Items de implementación; este README no la duplica.

---

## Qué es este repositorio

**REI Web** es la página oficial de REI Harness. Su objetivo es que una persona pueda entender qué es REI, cómo funciona y cómo adoptarlo sin tener que leer el repositorio del CLI de principio a fin.

La web no sustituye a la documentación del arnés: la hace accesible. La fuente de verdad sigue siendo el repositorio de REI Harness y sus releases; esta web traduce ese contenido a una experiencia visual, navegable y orientada a la adopción.

### Objetivos

- **Explicar el producto** — qué problema resuelve REI Harness y por qué existe.
- **Mostrar el flujo** — cómo se negocia un Work Item, cómo se aprueba la planificación y cómo intervienen los agentes.
- **Facilitar la instalación** — binario, plataformas, actualización y primeros pasos.
- **Servir de referencia** — comandos, estados, roles, visor e integración con GitHub.
- **Dar confianza** — mostrar el estado real del proyecto, sus límites y su filosofía, sin métricas ni testimonios inventados.

### Para quién

- Desarrolladores que ya trabajan con agentes de IA y quieren introducir un proceso SDD verificable.
- Personas que revisan y aprueban planificaciones antes de que se implementen.
- Equipos que alternan entre OpenCode, Claude Code, Cursor o Codex.
- Mantenedores que necesitan una referencia pública del CLI y de sus contratos de rol.

### Qué NO es

- **No es el repositorio del CLI.** El código de REI Harness vive en [k1wi777/REI-Harness](https://github.com/k1wi777/REI-Harness).
- **No es el visor de specs.** `rei view` es una herramienta local de solo lectura; esta web es un sitio público de documentación y presentación.
- **No es un panel de control ni un editor web.** No ejecuta comandos, no modifica Work Items y no sustituye al CLI.
- **No es un escaparate de métricas.** No hay clientes, testimonios ni cifras que no puedan demostrarse.

---

## El producto: REI Harness

### El problema

Trabajar con agentes de IA en modo conversacional tiene un riesgo evidente: el agente puede empezar a implementar antes de que el alcance esté claro, tomar decisiones de diseño por su cuenta o perder el contexto cuando la conversación termina. El resultado es código que funciona a medias, decisiones difíciles de revisar y un proceso que no deja rastro.

### La propuesta

REI Harness implanta un **arnés de Spec Driven Development** dentro de cualquier repositorio con un solo comando:

```bash
rei init
```

A partir de ahí, el trabajo se organiza en **Work Items** con roles explícitos y una **puerta de aprobación humana obligatoria**:

```text
Usuario → Leader → meta.json → Spec Author → Planificación
        → ⏸ Aprobación humana → Implementer → Reviewer → Finalización
```

El código nunca se implementa antes de que exista una planificación aprobada. El estado —planificación, progreso, decisiones e historial— vive en el propio repositorio, no en el historial del chat.

### Principios

| Principio | Qué implica |
|-----------|-------------|
| **Aprobación humana obligatoria** | Ningún Work Item pasa a implementación sin una aprobación explícita; no se asume por silencio. |
| **La documentación es la fuente de verdad** | Las decisiones viven en `.rei/specs/` y `.rei/docs/`, no en la conversación. |
| **Runtime-agnóstico** | El valor está en el contrato de rol y en el CLI; los adaptadores son una capa opcional. |
| **Código propio y dependencias mínimas** | La biblioteca estándar y el código propio van antes que las dependencias de terceros. |
| **Baja fricción de revisión** | El material debe poder revisarse de verdad: legible, navegable y con evidencia clara. |

### Funcionalidades actuales

| Área | Qué ofrece |
|------|------------|
| **Instalación** | Un único binario `rei` sin dependencias de runtime, distribuido para Linux, macOS y Windows en `amd64` y `arm64`. |
| **Inicialización** | `rei init` despliega `AGENTS.md`, `.rei/` y la estructura de estado sin sobrescribir archivos existentes; inicializa git si falta. |
| **Subagentes nativos** | `rei init opencode` y `rei init claude` generan agentes y el comando `/personalize` para OpenCode y Claude Code. Cursor y Codex funcionan por *fallback*. |
| **Personalización guiada** | El rol `initializer` conduce una entrevista para completar propósito, stack, arquitectura, convenciones y verificación del proyecto. |
| **Work Items** | Features con planificación completa (`requirements.md`, `design.md`, `tasks.md`) y Tasks con un plan breve (`plan.md`). |
| **Sesiones y estados** | `rei session`, `rei status set` y `rei items status` mantienen el ciclo `pending → ready → in_progress → review → done`, con `blocked` y `changes_requested` como ramificaciones. |
| **Validación** | `rei validate` comprueba la consistencia interna de un Work Item; `rei check` verifica el arnés y ejecuta los checks del proyecto. |
| **Revisión por diff** | `rei review-diff` entrega al Reviewer solo los cambios reales del Work Item, usando `base_commit` y `last_review_commit`. |
| **Visor local** | `rei view` sirve el Work Item en el navegador con documentos renderizados, TOC, validación, sesión, diff y FICHA; recarga en vivo por SSE y es de solo lectura. |
| **Integración con GitHub** | Opcional: issues, ramas, PR, merge, épicas y backlog. El CLI nunca llama a GitHub; las acciones las ejecuta el Leader con `gh` y `git`. |
| **Actualización** | `rei update` descarga la última release, verifica el checksum SHA-256 y reemplaza el binario de forma atómica; `rei update --check` solo informa. |
| **Diagnóstico** | `rei doctor` revisa la estructura del arnés, los roles y la personalización pendiente sin modificar nada. |

### Los agentes

| Agente | Responsabilidad |
|--------|-----------------|
| **Leader** | Comprender la solicitud, elegir el workflow y coordinar a los demás. No implementa salvo en el modo directo autorizado. |
| **Spec Author** | Convertir un Work Item pendiente en una planificación técnica revisable. Nunca implementa. |
| **Implementer** | Implementar únicamente la planificación aprobada, dejando evidencia de verificación. |
| **Reviewer** | Validar el trabajo contra la planificación y los checkpoints del proyecto; aprueba o solicita cambios. |
| **Initializer** | Conducir la personalización guiada de la documentación del proyecto. Nunca implementa código. |

Cada rol vive en `.rei/agents/<rol>.md` con un `## Contrato` autosuficiente y una `## Referencia` opcional. Los adaptadores traducen ese contrato al formato nativo de cada runtime; el contrato no se acopla a ninguno.

### Work Items y estados

| Tipo | Planificación | Cuándo usarlo |
|------|---------------|---------------|
| **Feature** | `requirements.md` + `design.md` + `tasks.md` | Funcionalidad nueva, cambio de comportamiento, arquitectura, refactor relevante o alcance que aún debe especificarse. |
| **Task** | `plan.md` | Documentación, contratos o cambio pequeño y localizado sin alterar comportamiento ni arquitectura. |

| Estado | Significado |
|--------|-------------|
| `pending` | Creado, pendiente de planificación. |
| `ready` | Planificación terminada, esperando aprobación humana. |
| `in_progress` | Implementación en curso. Solo puede haber uno a la vez. |
| `review` | Implementación finalizada, pendiente de revisión. |
| `done` | Completado y aprobado; estado terminal. |
| `blocked` | El trabajo no puede continuar. |
| `changes_requested` | La revisión rechazó la implementación y pide cambios. |

Existe además el **modo directo autorizado** para cambios triviales (documentación, erratas, formato, comentarios) solicitados explícitamente. No crea Work Item, planificación, sesión ni rama; si el cambio toca comportamiento, seguridad, datos, dependencias, API pública, arquitectura o más de un archivo, el Leader se niega y ofrece una Task o una Feature.

### Runtimes

| Runtime | Integración |
|---------|-------------|
| **OpenCode** | Subagentes nativos en `.opencode/agents/` y comando `/personalize`. |
| **Claude Code** | Subagentes nativos en `.claude/agents/`, `/personalize` y `CLAUDE.md`. |
| **Cursor / Codex** | Funcionan por *fallback*: el Leader transmite solo el `## Contrato` del rol. |

### Visor de especificaciones

`rei view` es un servidor HTTP local, de solo lectura, para revisar un Work Item en el navegador. Muestra los documentos de planificación y progreso, la validación, la sesión y el diff; incluye TOC, FICHA con issue/base/épica y recarga en vivo por SSE. El estado y la FICHA se actualizan solos, pero **no hay botón ni ruta de aprobación**: la aprobación se registra desde el CLI.

El visor no usa JavaScript, CSS ni fuentes de terceros. Sus assets son propios y van embebidos en el binario.

### Integración con GitHub

La integración es opcional y se activa con `rei github enable`. Permite vincular un Work Item con una issue, crear la rama, publicar comentarios de implementación y revisión, abrir un PR y hacer merge solo con una orden explícita. También cubre épicas y backlog de hijas.

GitHub es una **proyección** del trabajo, no la fuente de verdad: `.rei` manda sobre la ejecución del Work Item. El CLI no llama a GitHub; las acciones reales las ejecuta el Leader con `gh` y `git`.

### Distribución

- Binario único en Go, sin `CGO` y sin dependencias de runtime.
- Releases para Linux, macOS y Windows; `amd64` y `arm64`.
- Actualización atómica desde GitHub Releases con verificación de checksum.
- El esqueleto del arnés va embebido con `go:embed`: `rei init` no necesita clonar el repositorio.

### Documentación de referencia de REI

| Documento | Contenido |
|-----------|-----------|
| `.rei/docs/usage.md` | Guía para personas: primeros pasos, aprobación, sesiones y preguntas frecuentes. |
| `.rei/docs/harness/workflow.md` | Tipos de Work Item, estados y transiciones. |
| `.rei/docs/harness/specs.md` | Cómo se construye la planificación de una Feature. |
| `.rei/docs/harness/task.md` | Formato y presupuesto del plan de una Task. |
| `.rei/docs/harness/progress.md` | Sesión actual, historial y reportes por Work Item. |
| `.rei/docs/harness/adapters.md` | Formato canónico de rol y adaptadores de runtime. |
| `.rei/docs/harness/integrations/github.md` | Índice de la integración opcional con GitHub Issues. |

---

## La web: qué debe contar

La web se organiza alrededor de las preguntas que se hace alguien que descubre REI por primera vez.

| Sección | Objetivo |
|---------|----------|
| **Inicio** | Explicar en pocos segundos qué es REI, qué problema resuelve y cuál es el siguiente paso. |
| **Qué es REI** | Presentar el arnés, sus principios y su diferencia frente a un agente autónomo o un generador de código. |
| **Cómo funciona** | Mostrar el flujo completo, la puerta de aprobación humana y el papel de cada agente. |
| **Instalación** | Descarga, plataformas, verificación y actualización del binario. |
| **Primeros pasos** | `rei init`, personalización, subagentes nativos y primer Work Item. |
| **Comandos** | Referencia navegable del CLI, con ejemplos y códigos de salida relevantes. |
| **Agentes** | Contratos y responsabilidades de Leader, Spec Author, Implementer, Reviewer e Initializer. |
| **Work Items** | Features, Tasks, estados, transiciones y modo directo. |
| **Visor** | Qué muestra `rei view`, qué no hace y cómo encaja en la revisión. |
| **GitHub** | Integración opcional, límites y flujo issue → rama → PR → merge. |
| **FAQ** | Dudas frecuentes sobre alcance, git, checks, sesiones y convivencia con varios Work Items. |
| **Releases / changelog** | Enlace y resumen de versiones; la fuente canónica sigue siendo GitHub. |

### Reglas de contenido

- **Español directo.** La web habla el mismo idioma que la documentación de REI: claro, sin relleno y sin promesas que el producto no cumpla.
- **Sin datos inventados.** Nada de testimonios, clientes, métricas de adopción ni comparativas no demostrables.
- **Una sola fuente por dato.** La lista de comandos, estados y agentes se define una vez y se reutiliza; no se duplica texto entre páginas.
- **Enlazar a la fuente.** Las versiones, releases, issues y documentación canónica apuntan al repositorio de REI Harness.
- **Mostrar límites.** El visor es de solo lectura, la integración con GitHub es opcional y el modo directo tiene restricciones; la web debe decirlo.

---

## Stack

| Pieza | Versión / decisión |
|-------|--------------------|
| **Framework** | Next.js `16.4.3` con App Router |
| **UI** | React `19.3.0` |
| **Lenguaje** | TypeScript `5` en modo estricto |
| **Estilos** | Tailwind CSS `4` con el loader de Turbopack |
| **Bundler** | Turbopack |
| **Paquetes** | `pnpm@11.18.0` |
| **Node.js** | `>=20.9.0` |
| **Datos** | Ninguno en v1: contenido estático versionado en el repositorio |
| **Backend / BD / auth** | Fuera de alcance por ahora |

`next.config.ts` activa `cacheComponents`, `partialPrefetching` y `experimental.agentFeedback`. El proyecto usa Server Components por defecto.

### Comandos

La aplicación está en la raíz del repositorio; ejecuta los comandos desde ahí.

```bash
pnpm install
pnpm dev
```

| Comando | Qué hace |
|---------|----------|
| `pnpm dev` | Servidor de desarrollo en `http://localhost:3000`. |
| `pnpm build` | Build de producción; también valida TypeScript. |
| `pnpm start` | Sirve el build de producción. |
| `pnpm lint` | Ejecuta ESLint. |
| `pnpm test` | Ejecuta la suite de Jest sobre lógica y datos (`content/`, `lib/`, `features/**/data/`). |
| `pnpm test:watch` | Repite la suite al cambiar archivos. |
| `pnpm test:coverage` | Ejecuta la suite con informe de cobertura, sin umbrales. |
| `pnpm capture:evidence` | Regenera las capturas reales de producto en `public/evidence/`. |

### Evidencia del producto

La home muestra capturas reales del visor `rei view` y de las GitHub Issues públicas del repositorio de REI Harness. Se generan con `scripts/capture-evidence.mjs`, que usa `playwright-core` contra el Chrome instalado en el sistema (`channel: "chrome"`), sin descargar navegadores ni añadir dependencias de runtime.

Requisitos para regenerarlas:

- Chrome instalado y accesible por Playwright.
- `rei` en el `PATH` (el visor se arranca en primer plano y se cierra con `SIGINT`).
- Red para consultar GitHub Issues; no se usa autenticación.

El comando escribe las capturas y `public/evidence/manifest.json` de forma atómica: si una captura falla, conserva el manifiesto anterior y sale con código distinto de cero indicando la captura y la causa. Las imágenes y el manifiesto se versionan; `pnpm build` y `pnpm test` no ejecutan el pipeline.

---

## Estructura actual del repositorio

```text
.
├── README.md                 # Este documento
├── .gitignore                # Dependencias, build, env y harness local
├── AGENTS.md                 # Punto de entrada para agentes
├── docs/                     # Estrategia de producto y arquitectura de información
├── app/                      # App Router
├── public/                   # Assets estáticos, incluida public/evidence/
├── scripts/                  # Pipeline de capturas de evidencia
├── .rei/                     # Arnés REI: docs, agentes, plantillas y estado
├── .opencode/                # Subagentes nativos de OpenCode
├── package.json
├── next.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
└── REI-HARNESS-SDD/          # Copia local de REI Harness; NO se versiona
```

La aplicación, el arnés y la documentación comparten la raíz del repositorio. `REI-HARNESS-SDD/` es una copia de trabajo para consultar la implementación del arnés y **no forma parte del repositorio**.

---

## Arquitectura: feature-first

La web se organizará por **features**, no por tipos de archivo. Una feature es una unidad vertical que posee su interfaz, su contenido, sus tipos y su lógica de presentación. El App Router se queda como una capa fina de rutas que compone features.

> Esta sección describe la arquitectura objetivo. Las primeras Features la crearán de forma incremental; no se adelanta código que todavía no existe.

### Estructura objetivo

```text
.
├── app/                          # Rutas, layouts y metadata
│   ├── layout.tsx                # Layout raíz: html, body, fuentes, tokens
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── (site)/
│       ├── layout.tsx            # Cabecera y pie comunes
│       ├── page.tsx              # Inicio
│       ├── que-es/page.tsx
│       ├── como-funciona/page.tsx
│       ├── instalacion/page.tsx
│       ├── comandos/page.tsx
│       ├── agentes/page.tsx
│       ├── workflow/page.tsx
│       ├── visor/page.tsx
│       ├── github/page.tsx
│       └── faq/page.tsx
├── features/                     # Una carpeta por dominio funcional
│   ├── home/
│   ├── what-is-rei/
│   ├── how-it-works/
│   ├── installation/
│   ├── commands/
│   ├── agents/
│   ├── work-items/
│   ├── viewer/
│   ├── github-integration/
│   └── faq/
├── components/
│   ├── layout/                   # Header, footer, navegación, shell
│   └── ui/                       # Primitivas reutilizables (botón, badge, card)
├── content/
│   └── site.ts                   # Navegación, enlaces y metadata global
├── lib/                          # Utilidades puras y helpers compartidos
├── public/                       # Assets estáticos
└── ...
```

### Anatomía de una feature

```text
features/commands/
├── components/
│   ├── command-card.tsx
│   └── command-table.tsx
├── data/
│   └── commands.ts               # Fuente única de la referencia de comandos
├── types.ts
├── commands-page.tsx             # Composición de la página
└── index.ts                      # API pública de la feature
```

La API pública se limita a lo que consume el resto de la aplicación:

```ts
// features/commands/index.ts
export { CommandsPage } from "./commands-page";
export type { Command } from "./types";
```

### Reglas de dependencia

```text
app/  →  features/<slug>/  →  components/ui + lib + content
             │
             └── ✕  una feature no importa otra feature
```

- **`app/` no contiene lógica de contenido.** Solo declara rutas, layouts, metadata y composición.
- **Una feature posee todo lo suyo.** Componentes, datos, tipos y utilidades específicas viven dentro de `features/<slug>/`.
- **Las features no se importan entre sí.** Si dos features necesitan lo mismo, se extrae a `components/ui`, `lib` o `content`.
- **Los imports cruzados usan la API pública.** `@/features/commands`, nunca `@/features/commands/components/...` desde fuera.
- **Las primitivas compartidas no conocen el dominio.** `components/ui` no importa features ni datos de REI.
- **`lib/` contiene funciones puras.** Nada de estado global ni acceso a datos.
- **Una feature no se infla.** Si empieza a cubrir varios dominios, se divide.

### Ruta fina, feature gruesa

```tsx
// app/comandos/page.tsx
import type { Metadata } from "next";
import { CommandsPage } from "@/features/commands";

export const metadata: Metadata = {
  title: "Comandos — REI Harness",
  description: "Referencia de comandos del CLI rei.",
};

export default function Page() {
  return <CommandsPage />;
}
```

La ruta no decide cómo se ve la página ni dónde viven sus datos. Solo la expone.

### Contenido y datos

- El contenido es **estático y versionado**. No hay CMS, base de datos ni API en v1.
- Cada feature mantiene sus datos en `data/` con tipos explícitos.
- La información transversal (navegación, enlaces a GitHub, nombre del producto, metadatos globales) vive en `content/site.ts`.
- Los datos que aparecen en varias páginas se definen una sola vez y se importan; no se copian literales.
- Si una página necesita prosa larga, se modela como datos tipados dentro de su feature. Introducir MDX u otro formato requiere justificar la dependencia.

### Server Components y cliente

- **Server Components por defecto.**
- `"use client"` se reserva para interacción real: menú móvil, tabs, botón de copiar, búsqueda o animaciones puntuales.
- No se usa `useEffect` para renderizar contenido estático.
- El contenido principal debe ser legible sin JavaScript.

### Estilos

- Tailwind CSS 4 con tokens declarados en `app/globals.css`.
- Los componentes usan tokens (`bg-surface`, `text-muted`, `border-hairline`), no colores arbitrarios repetidos.
- No se introduce un kit de UI externo sin justificación; las primitivas propias viven en `components/ui`.
- Las variantes se resuelven con composición y props explícitas, no con cadenas de clases imposibles de mantener.

### Nombres

- Carpetas y rutas en `kebab-case`.
- Componentes en `PascalCase`.
- Funciones y variables en `camelCase`.
- Tipos e interfaces en `PascalCase`.
- Nombres de archivo de componentes en `kebab-case` cuando sean varios; un componente por archivo.
- Rutas públicas en español, coherentes con el contenido.

### Verificación de la arquitectura

- Una página nueva debe poder explicarse como «ruta fina + feature».
- Si un componente de `app/` crece, se mueve a una feature.
- Si una feature importa otra, la dependencia se reconsidera antes de escribirla.
- Si un dato se repite en dos features, se mueve a `content/` o `lib/`.

---


## Verificación

Los checkpoints recomendados son:

| ID | Comando | Qué valida |
|----|---------|------------|
| `V1` | `pnpm lint` | ESLint y convenciones del proyecto. |
| `V4` | `pnpm test` | Lógica y datos: comandos, estados, agentes, navegación, docs y utilidades puras. |
| `V2` | `pnpm build` | Compilación de producción, TypeScript y rutas. |
| `V3` | Revisión manual | Responsive, teclado, contraste, enlaces y contenido. |

`V1` y `V4` son rápidos y pueden ejecutarse muchas veces al día; `V2` es más lento y se reserva para cerrar un Work Item. `V4` solo cubre lógica y datos: no hay tests de UI, DOM, CSS, snapshots ni navegador.

Antes de solicitar revisión:

```bash
pnpm lint
pnpm test
pnpm build
```

---

## Trabajo con REI en este repositorio

Este proyecto usa REI Harness para construirse a sí mismo. El arnés vive en `.rei/` y el punto de entrada para agentes es `AGENTS.md`.

### Personalización inicial

```bash
rei init status
```

Si hay documentos pendientes, ejecuta `/personalize` en OpenCode/Claude Code o pide al agente «personaliza mi proyecto». El Initializer completará:

- `AGENTS.md` §2 (propósito, usuarios, principios y límites).
- `AGENTS.md` §3 (stack y comandos).
- `.rei/docs/project/architecture.md`.
- `.rei/docs/project/conventions.md`.
- `.rei/docs/project/verification.md`.
- `.rei/config.json` con los checkpoints rápidos.

Este README es la referencia para esa entrevista.

### Ciclo de trabajo

1. El Leader negocia contigo el Work Item.
2. El Spec Author planifica.
3. **Tú apruebas explícitamente.**
4. El Implementer ejecuta la planificación aprobada.
5. El Reviewer verifica contra la planificación y los checkpoints.
6. El Work Item pasa a `done` y se archiva en el historial.

Para cambios triviales puedes pedir un **cambio directo** («sin Work Item»). No crea planificación ni registro, y solo aplica a documentación, erratas, formato o comentarios.

### Archivos generados

- `.opencode/agents/*.md` y `.opencode/commands/personalize.md` son generados por `rei init opencode`.
- `.claude/agents/*.md`, `.claude/commands/personalize.md` y `CLAUDE.md` son generados por `rei init claude`.
- No los edites a mano: la fuente de verdad es `.rei/agents/<rol>.md`. Regenera con el CLI.

### `REI-HARNESS-SDD/`

Es una copia local del repositorio de REI Harness para consultar su implementación mientras se construye la web. Está en `.gitignore` y **no debe versionarse**. Si clonas este repositorio desde cero, no la necesitas: la documentación del arnés ya está en `.rei/`.

---

## Despliegue

Todavía no hay proveedor ni dominio decidido. La web es estática por naturaleza y no requiere backend para v1. Cuando se elija el destino, se documentarán aquí:

- proveedor y configuración;
- variables de entorno (si existen);
- comando de build;
- dominio y canonical;
- proceso de publicación.

---

## Roadmap

| Fase | Alcance | Estado |
|------|---------|--------|
| **0. Base** | Scaffold de Next.js, arnés REI inicializado, README y `.gitignore`. | Completada |
| **1. Fundamentos** | Tokens visuales, layout, navegación, footer y página de inicio. | Completada |
| **2. Producto** | Qué es REI, cómo funciona, agentes, ciclo y flujo de aprobación. | Completada |
| **3. Referencia** | Instalación, comandos, Work Items, visor, GitHub Issues y FAQ. | Completada |
| **4. Pulido** | Responsive, accesibilidad, tipografía, evidencia interactiva y revisión visual. | Completada |
| **5. Publicación** | SEO, Open Graph, rendimiento, `llms.txt`, CI, despliegue, dominio y revisión final. | Pendiente |

Las fases son orientativas. Cada cambio relevante se planifica como Feature o Task mediante REI; no se implementa directamente sobre la rama principal sin aprobación.

---

## Contribuir

- Lee `AGENTS.md` antes de tocar el proyecto.
- Usa REI para cambios relevantes: Work Item, planificación y aprobación.
- Mantén el español como idioma del contenido y de los mensajes de producto.
- Respeta la arquitectura feature-first y las reglas de dependencia.
- No edites archivos generados por `rei init`.
- No versiones `REI-HARNESS-SDD/`.
- Antes de abrir un PR, ejecuta `pnpm lint` y `pnpm build`.

---

## Enlaces

- [REI Harness](https://github.com/k1wi777/REI-Harness)
- [Releases de REI Harness](https://github.com/k1wi777/REI-Harness/releases)
- [Issues de REI Harness](https://github.com/k1wi777/REI-Harness/issues)
- [Guía de uso de REI](.rei/docs/usage.md)
- [Workflow de REI](.rei/docs/harness/workflow.md)
- [Documentación de Next.js](https://nextjs.org/docs)
- Documentación de Next.js incluida en la instalación: `node_modules/next/dist/docs/`
