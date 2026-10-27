# AGENTS.md — REI Harness

> Este archivo es el **punto de entrada universal** para cualquier agente de IA que trabaje en este repositorio.
>
> Su objetivo es proporcionar únicamente el contexto esencial para orientarse dentro del proyecto y saber dónde encontrar información adicional. **No debe contener toda la documentación del proyecto.**
>Carga únicamente el contexto necesario para la tarea actual.
> Las responsabilidades específicas de cada rol se encuentran en `.rei/agents/`.
> Cada rol se define en `.rei/agents/<rol>.md` con frontmatter, un `## Contrato`
> autosuficiente y una `## Referencia` opcional; a los subagentes se les
> transmite únicamente el `## Contrato`. Consulta `.rei/docs/harness/adapters.md`.

**No ignores estas reglas.**

---

# 1. Antes de comenzar

Antes de realizar cualquier modificación en el proyecto:

1. Ejecuta `rei check --quiet`.
2. Si falla, DETENTE e informa el problema.
3. Carga únicamente la documentación necesaria para la tarea actual siguiendo el orden de la Sección 8.

No continúes hasta completar estos pasos.

---

# 2. Propósito del proyecto

*Resume aquí el objetivo del proyecto. Esta información guía las decisiones del agente y evita cambios que contradigan la visión del producto.*

## Qué construimos

**REI Web** es la página oficial de [REI Harness](https://github.com/k1wi777/REI-Harness): un sitio que permite entender qué es el arnés de Spec Driven Development, cómo funciona su flujo con aprobación humana y cómo adoptarlo, sin tener que leer el repositorio del CLI de principio a fin. La web no sustituye a la documentación del arnés: la hace accesible. La fuente de verdad de versiones sigue siendo GitHub Releases.

## Para quién

- Desarrolladores que ya trabajan con agentes de IA y quieren introducir un proceso SDD verificable.
- Personas que revisan y aprueban planificaciones antes de que se implementen.
- Equipos que alternan entre OpenCode, Claude Code, Cursor o Codex.
- Mantenedores que necesitan una referencia pública del CLI y de sus contratos de rol.

## Principios

*Todas las decisiones deben respetar estos principios.*

- **Aprobación humana obligatoria** — el flujo que explica la web es el real: nada pasa a implementación sin aprobación explícita; la web nunca sugiere atajos que el arnés no permite.
- **La documentación es la fuente de verdad** — lo que la web afirma debe poder rastrearse a `README.md`, `.rei/docs/` o al repositorio de REI Harness; las decisiones viven en archivos, no en la conversación.
- **Sin datos inventados** — nada de testimonios, clientes, métricas de adopción ni comparativas no demostrables.
- **Una sola fuente por dato** — comandos, estados y agentes se definen una vez y se reutilizan; no se duplica texto entre páginas.
- **Código propio y dependencias mínimas** — se prefiere la plataforma (Next.js, React, Tailwind) y código propio antes que añadir librerías.
- **Español directo** — el contenido es claro, sin relleno, en español, coherente con la documentación de REI.
- **Mostrar límites** — el visor es de solo lectura, la integración con GitHub es opcional y el modo directo tiene restricciones; la web lo dice.

## Qué NO es

*Acota explícitamente el alcance del proyecto para evitar feature creep.*

- **No es el repositorio del CLI.** El código de REI Harness vive en `k1wi777/REI-Harness`.
- **No es el visor de specs.** `rei view` es una herramienta local de solo lectura; esta web es un sitio público de documentación y presentación.
- **No es un panel de control ni un editor web.** No ejecuta comandos, no modifica Work Items y no sustituye al CLI.
- **No es un escaparate de métricas.** No hay clientes, testimonios ni cifras que no puedan demostrarse.
- **No tiene backend, base de datos, autenticación ni CMS en v1.** El contenido es estático y versionado.

---

# 3. Stack técnico

*Documenta únicamente la información técnica esencial para comprender el proyecto.*

## Tecnologías principales

- **Lenguaje:** TypeScript 5 en modo estricto (`strict: true`), con alias `@/*` → raíz del repo.
- **Framework:** Next.js `16.4.3` con App Router, Server Components por defecto, Turbopack (`cacheComponents`, `partialPrefetching`) y React `19.3.0`.
- **Estilos:** Tailwind CSS `4` con el loader `@tailwindcss/turbopack`; tokens en `app/globals.css`.
- **Paquetes:** `pnpm@11.18.0`; Node.js `>=20.9.0`.
- **Base de datos:** ninguna en v1. Contenido estático y versionado en el repositorio; sin backend, API, autenticación ni CMS.
- **Testing:** no hay suite de tests ni script de test todavía. La verificación es linter, build y revisión manual.
- **Despliegue:** sin proveedor ni dominio decidido todavía.

## Comandos principales

*Comandos que cualquier agente utilizará con frecuencia. Se ejecutan desde la raíz del repositorio.*

- `pnpm install` — Instalar dependencias.
- `pnpm dev` — Servidor de desarrollo en `http://localhost:3000`.
- `pnpm lint` — ESLint con `eslint-config-next` (`core-web-vitals` + TypeScript).
- `pnpm build` — Build de producción; también valida TypeScript.
- `pnpm start` — Servir el build de producción.

> No existe `pnpm test` ni un script de typecheck separado: `pnpm build` es la comprobación de tipos.

---

# 4. Estructura del repositorio

*Utiliza este mapa para orientarte dentro del proyecto.*

| Ruta | Propósito |
|------|-----------|
| `app/` | Rutas, layouts, metadata y composición del App Router. |
| `features/` | Features verticales: UI, datos, tipos y lógica de presentación. Se crea con las primeras Features. |
| `components/` | Primitivas de UI (`ui/`) y shell compartido (`layout/`). |
| `content/` | Navegación, enlaces y metadata global del sitio. |
| `lib/` | Utilidades puras y helpers compartidos. |
| `public/` | Assets estáticos. |
| `docs/` | Documentación de producto y estrategia del sitio. |
| `README.md` (raíz) | Documentación del repositorio: producto, stack, arquitectura y estado. |
| `.rei/specs/` | Work Items y planificación del REI Harness. |
| `.rei/progress/` | Estado actual (`current.md`), historial general (`history.md`) y detalle de Work Items. |
| `.rei/progress/work-items/` | Registros detallados de cada Work Item, organizados cronológicamente. |
| `.rei/docs/harness/` | Documentación del arnés (workflow, specs, progreso). |
| `.rei/docs/project/` | Documentación específica del proyecto. |
| `.rei/agents/` | Roles y comportamiento de los subagentes (frontmatter + `## Contrato` + `## Referencia`). |
| `.rei/adapters/` | Adaptadores de runtime (plantilla + mapa de herramientas); p. ej. `opencode/`. |
| `.rei/templates/` | Plantillas canónicas (`current.md`, `history.md`, `meta.json`). Fuente única de verdad. |
| `.opencode/` | Subagentes nativos generados por `rei init opencode`; no editar a mano. |
| `.claude/` | Subagentes nativos generados por `rei init claude` (si se usa Claude Code); no editar a mano. |
| `REI-HARNESS-SDD/` | Copia local de REI Harness; ignorada por git y fuera del repositorio. |

---

# 5. Workflow

Todo Work Item debe seguir el workflow definido por el proyecto.

Antes de comenzar cualquier trabajo consulta:

`.rei/docs/harness/workflow.md`

**No omitas ninguna etapa del workflow.**

### Modo directo autorizado

El **modo directo** es una vía fuera del workflow de Work Items —no un tipo ni un
estado— para que el Leader aplique un cambio trivial solicitado explícitamente.
Solo se activa si el usuario pide un «cambio directo» o «sin Work Item»; el
Leader nunca lo inicia por iniciativa propia.

- **Elegible:** documentación, erratas, formato, comentarios o ajustes triviales
  sin cambio de comportamiento.
- **Negativa:** si afecta comportamiento, seguridad, datos, dependencias, API
  pública, arquitectura, más de un archivo o necesita especificación o revisión,
  el Leader se niega y ofrece Task o Feature. La insistencia del usuario no es
  autorización: no hay override.
- **Autorización:** aun siendo elegible, el Leader pide confirmación explícita e
  informa de que no habrá planificación, rama ni registro. Si duda, avisa y exige
  esa confirmación; el defecto es **no** aplicar el modo directo.
- **Sin registro:** no crea Work Item, spec, `meta.json`, `current.md`,
  `history.md`, `direct.md`, sesión, issue ni rama, ni altera Work Items
  existentes; opera sobre la rama y el árbol actuales y su única traza es el
  diff/commit y la conversación.
- **Verificación:** siempre `rei check` y, según el cambio, los checks del
  proyecto declarados en `.rei/config.json`/`verification.md`; el Leader reporta
  comandos y resultado. Sin Reviewer salvo petición explícita del usuario.
- **Entrega:** sin una orden explícita no hay commit, push, PR ni merge.

Esta es la única excepción a «no omitas etapas» y a la prohibición de implementar
del rol Leader; el resto de reglas duras sigue vigente. Ver
`.rei/docs/harness/workflow.md`.

---

# 6. Rol del agente principal

El agente que recibe directamente las solicitudes del usuario actúa siempre como **Leader**.

Antes de comenzar cualquier tarea DEBE consultar:

`.rei/agents/leader.md`

El Leader es el único responsable de:

- comprender la solicitud del usuario;
- seleccionar el workflow adecuado;
- coordinar a los demás subagentes.

Ningún otro agente debe asumir estas responsabilidades.

Al delegar en un subagente, el Leader transmite únicamente la sección `## Contrato`
del rol correspondiente, nunca el archivo completo (`## Referencia` es detalle
opcional y no se envía). Si el runtime dispone de un adaptador nativo
(`rei init opencode`), el subagente recibe ese mismo Contrato como system prompt.

Si el usuario pide personalizar el proyecto (por ejemplo, «personaliza mi
proyecto»), el Leader NO crea un Work Item: delega directamente en el rol
`initializer` (`.rei/agents/initializer.md`) transmitiéndole su `## Contrato` y
espera a que finalice. En un runtime con adaptador nativo, el comando
`/personalize` ejecuta este mismo camino.

---

# 7. Documentación

Consulta únicamente la documentación necesaria para la tarea actual.

## Documentación de REI Harness

Define cómo funciona el arnés. No requiere personalización por proyecto.

| Si necesitas... | Consulta... |
|-----------------|-------------|
| Workflow | `.rei/docs/harness/workflow.md` |
| Spec Driven Development | `.rei/docs/harness/specs.md` |
| Planificación de Tasks | `.rei/docs/harness/task.md` |
| Sistema de progreso | `.rei/docs/harness/progress.md` |
| Estructura de `meta.json` | `.rei/docs/harness/meta.md` |
| Roles y adaptadores | `.rei/docs/harness/adapters.md` |
| Integración GitHub (opcional) | `.rei/docs/harness/integrations/github.md` |
| El comportamiento de un agente | `.rei/agents/<role>.md` |

## Documentación del proyecto

Describe las reglas de **este repositorio**. Debe personalizarse al implementar REI Harness.

| Si necesitas... | Consulta... | Quién lo lee por defecto |
|-----------------|-------------|--------------------------|
| Arquitectura | `.rei/docs/project/architecture.md` | Implementer, Spec Author (diseño) |
| Convenciones | `.rei/docs/project/conventions.md` | Implementer |
| Verificación | `.rei/docs/project/verification.md` | Reviewer |

## Work Items

| Si necesitas... | Consulta... |
|-----------------|-------------|
| Un Work Item concreto | `.rei/specs/<work-item-id>/` |
| El comportamiento de un agente | `.rei/agents/<role>.md` |
No cargues documentación que no aporte contexto a la tarea actual.

---

# 8. Carga de contexto

Prioriza siempre la carga de información en el siguiente orden:

1. `AGENTS.md`
2. `.rei/agents/<role>.md`
3. `docs/...`
4. `.rei/specs/<work-item-id>/`

Carga únicamente el contexto necesario para completar la tarea actual.

---

# 9. Principios generales

Estas reglas aplican a cualquier agente del repositorio.

- La documentación es la fuente de verdad.
- Trabaja sobre un único Work Item por sesión. El **modo directo autorizado**
  (§5) es la excepción: no abre ni modifica Work Items ni sesión, y solo se usa
  con disparador y confirmación explícitos.
- No omitas etapas del workflow.
- Consulta la documentación antes de asumir comportamientos no especificados.
- Si encuentras documentación contradictoria, DETENTE y repórtala.
- Para conocer el estado de la sesión o de los Work Items, usa el CLI (`rei session`, `rei items status`); no escanees `meta.json` manualmente.
- No releas un archivo que ya esté en tu contexto; para localizar un dato concreto usa búsquedas en lugar de releer el archivo completo.
- En caso de conflicto entre documentos, prevalece el orden inverso de la Sección 8:
  `.rei/specs/<work-item-id>/` > `.rei/docs/...` > `.rei/agents/<role>.md` > `AGENTS.md`.

---
