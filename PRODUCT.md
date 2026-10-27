# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Desarrolladores que ya trabajan con agentes de IA y quieren introducir un proceso de Spec Driven Development verificable sin montar un proceso pesado. Personas que revisan y aprueban planificaciones antes de que se escriba código (revisores, tech leads, mantenedores). Equipos que alternan entre OpenCode, Claude Code, Cursor y Codex y necesitan un contrato de rol común. Mantenedores que buscan una referencia pública del CLI, sus estados y sus contratos. Escépticos que necesitan ver límites y evidencia antes de adoptar.

El contexto de uso es nocturno y de escritorio: terminal, editor y documentación abiertos a la vez, sesiones largas, lectura de código y de flujo. También se consulta en móvil para orientarse o compartir un enlace.

## Product Purpose

REI Web es el sitio oficial de REI Harness. Explica qué es el arnés, por qué existe, cómo funciona su flujo con aprobación humana y cómo adoptarlo, sin obligar a leer el repositorio del CLI de principio a fin.

El sitio debe explicar el «por qué» antes del «qué»: desarrollo a ciegas, alucinaciones, decisiones no autorizadas, acciones fuera de límite y retrabajo. Los comandos son una consecuencia del proceso, no el argumento. El éxito es que un desarrollador entienda en segundos qué es REI y por qué importa, y que quien vaya a adoptarlo encuentre instalación, primer Work Item y referencia sin fricción.

## Positioning

REI Harness convierte el trabajo con agentes de IA en un proceso con especificación, aprobación y evidencia, dentro del propio repositorio.

Su mecanismo diferencial no es un agente más capaz ni un generador de código: es el proceso que lo rodea. Separa decidir, planificar y ejecutar; exige una planificación aprobada antes de implementar; reparte el trabajo en roles con contrato propio (Leader, Spec Author, Implementer, Reviewer, Initializer); y deja planificación, progreso, decisiones e historial versionados en `.rei/`, no en el chat. La aprobación humana es obligatoria y el silencio no aprueba. El valor es runtime-agnóstico y local-first; los adaptadores son una capa opcional.

## Operating Context

- El producto canónico es el CLI en Go `rei`, instalado como binario único en Linux, macOS y Windows (`amd64` y `arm64`), sin dependencias de runtime.
- `rei init` despliega `AGENTS.md` y `.rei/` en un repositorio existente sin sobrescribir archivos; `rei init opencode` y `rei init claude` generan subagentes nativos. Cursor y Codex funcionan por fallback.
- El ciclo de un Work Item es `pending → ready → in_progress → review → done`, con `blocked` y `changes_requested` como ramas. Solo puede haber un Work Item `in_progress` a la vez.
- La aprobación se registra desde el CLI. El visor `rei view` es local, de solo lectura y no tiene botón ni ruta de aprobación.
- La integración con GitHub es opcional y es una proyección del trabajo: `.rei` manda; el CLI nunca llama a GitHub, lo hacen `gh` y `git` bajo orden del Leader.
- Existe un modo directo autorizado solo para cambios triviales solicitados explícitamente; no crea Work Item, planificación, sesión ni rama.
- La documentación del arnés y la estrategia del sitio viven en el repositorio; las versiones canónicas viven en GitHub Releases.
- La web se construye con el mismo arnés que documenta.

## Capabilities and Constraints

- Superficies de v1: Home (Persuade) y un docs shell (Read) con sidebar, tabs de modo con URLs reales, TOC, bloques de código con copiar y navegación anterior/siguiente. Rutas de marketing, aprendizaje, referencia y soporte definidas en `docs/product-strategy.md` §8.
- Tabs de modo: Empezar, Conceptos, Guías, Referencia, Operación, como rutas reales; nunca `?tab=`.
- Contenido estático, tipado y versionado. Sin backend, base de datos, autenticación, CMS, búsqueda ni selector de versiones en v1. No se muestra UI falsa para funciones inexistentes.
- Stack: Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript estricto, pnpm. Server Components por defecto; JavaScript de cliente mínimo. Sin kits de UI ni librerías de animación pesadas. Geist ya está instalado; cualquier otra tipografía debe servirse localmente.
- Arquitectura feature-first: `app/` es capa fina de rutas y metadata; cada feature posee UI, datos y tipos; lo transversal vive en `content/`; tokens en `app/globals.css`.
- Español en todo el contenido visible. Accesibilidad AA, foco visible, teclado completo, HTML semántico, `prefers-reduced-motion`, responsive desde 360 px.
- No hay métricas, testimonios, clientes, logos de terceros ni comparativas inventadas. Las cifras externas solo aparecen con enlace a su fuente y como máximo tres en la home.
- La web no ejecuta comandos, no modifica Work Items y no sustituye al CLI ni al visor.
- Decisiones abiertas: búsqueda (pospuesta), despliegue y dominio, profundidad del changelog propio, necesidad real de `/guias`.

## Brand Commitments

- Nombre: REI Harness / REI. Web: REI Web.
- Voz: español directo, claro, sin relleno, sin hype. Explica límites y no promete eliminar errores ni volver autónoma la IA.
- Identidad propia de REI; no se copian Cursor, Vercel, Claude, Linear ni ninguna otra referencia. Se extraen principios de craft, jerarquía y comportamiento, no pieles.
- Prohibido: estética genérica de startup de IA (orbes violetas, gradientes de neón, glassmorphism, tarjetas flotantes sin contenido, dashboards falsos, ilustraciones de stock).
- La aprobación humana no se presenta como omitible ni como atajo.
- Fuente de verdad de versiones: GitHub Releases.

## Evidence on Hand

- Producto real y documentación: `README.md`, `docs/product-strategy.md`, `.rei/docs/`, el repositorio público `k1wi777/REI-Harness` y sus releases.
- Comandos y estados reales: `rei init`, `rei items status`, `rei session`, `rei status set`, `rei validate`, `rei check`, `rei review-diff`, `rei view`, `rei github enable`, `rei update`, `rei doctor`; estados `pending`, `ready`, `in_progress`, `review`, `done`, `blocked`, `changes_requested`.
- Roles reales y sus contratos en `.rei/agents/`.
- Evidencia externa citada en `docs/product-strategy.md` §20 (Replit, METR, GitClear, Veracode, DORA, Stack Overflow, GitHub Copilot). Cualquier uso exige enlace.
- No existen testimonios, clientes, métricas de adopción, capturas de producto ni casos de estudio propios. No deben fabricarse.

## Product Principles

1. **El porqué antes del qué.** El proceso y el problema justifican los comandos; nunca al revés.
2. **La aprobación humana es el producto.** El flujo debe hacer visible la puerta de aprobación, no esconderla.
3. **La documentación es la fuente de verdad.** Lo que la web afirma debe rastrearse al repositorio o a una fuente citada.
4. **Mostrar límites da confianza.** El visor es de solo lectura, GitHub es opcional, el modo directo tiene restricciones.
5. **Una sola fuente por dato y dependencias mínimas.** Comandos, estados y roles se definen una vez; se prefiere la plataforma y el código propio.

## Accessibility & Inclusion

AA como mínimo en texto normal y grande; el color nunca es el único portador de significado. Navegación completa por teclado, foco visible, enlace de salto, HTML semántico y enlaces descriptivos. Respeto de `prefers-reduced-motion`. Responsive desde 360 px, sin código que rompa el ancho. Contenido principal legible sin JavaScript.
