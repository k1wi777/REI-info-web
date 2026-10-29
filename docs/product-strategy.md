# Estrategia de producto y arquitectura de información

> Documento de estrategia de **REI Web**: qué debe contar el sitio, para quién,
> cómo se organiza y cómo se ve. No implementa la web ni crea componentes: fija
> las decisiones y recomendaciones que guiarán los Work Items de implementación.

## Cómo leer este documento

Cada bloque relevante se etiqueta según su grado de compromiso:

| Etiqueta | Significado |
|----------|-------------|
| **Decisión** | Acordada con el usuario. No se reabre sin un Work Item que la cambie. |
| **Recomendación** | Propuesta razonada; puede refinarse durante la implementación. |
| **Abierta** | Aún sin resolver. No debe asumirse por defecto. |

El stack, los comandos y la estructura del repositorio viven en `README.md`; las
reglas arquitectónicas, en `.rei/docs/project/architecture.md` y `conventions.md`.
Este documento no los repite: los da por supuestos y enlaza a ellos cuando importa.

## 1. Resumen ejecutivo

**Decisión.** La tesis del sitio es una sola frase: **la IA trabaja sobre
guardarraíles, con un plan verificable y con el humano en control**.

- La IA acelera la escritura de código, pero no garantiza que se esté construyendo
  lo correcto. Sin plan, sin alcance y sin revisión, la velocidad se convierte en
  retrabajo, deuda y pérdida de confianza.
- REI Harness no frena a la IA: evita que avance sin dirección. Especificación
  primero, aprobación humana obligatoria, roles separados y evidencia en el
  repositorio.
- La web debe explicar ese «por qué» antes del «cómo». Los comandos son una
  consecuencia del proceso, no el argumento.

**Decisión.** El sitio no promete eliminar errores ni autonomía. Promete proceso:
lo que el arnés hace cumplir y lo que deja por escrito.

**Recomendación.** El sitio se construye con el mismo arnés que documenta: cada
cambio relevante nace como Work Item, se planifica y se aprueba antes de
implementarse. El repositorio público es, en sí mismo, la demostración.

## 2. Posicionamiento y propuesta de valor

### Qué es

**Decisión.** REI Harness es un arnés de **Spec Driven Development** que se instala
en cualquier repositorio con un comando y coordina agentes de IA con una puerta de
aprobación humana obligatoria. El trabajo se organiza en Work Items con roles
explícitos, estados y evidencia versionada.

### Frase de posicionamiento

**Decisión.** Una frase reutilizable en home, metadata y presentaciones:

> REI Harness convierte el trabajo con agentes de IA en un proceso con
> especificación, aprobación y evidencia, dentro de tu propio repositorio.

### Para quién

Desarrolladores que ya usan agentes y quieren dejar de improvisar; quienes revisan
y aprueban antes de que se escriba código; equipos que alternan entre OpenCode,
Claude Code, Cursor o Codex; mantenedores que necesitan referencia pública.

### Qué problema resuelve

**Decisión.** Separa tres cosas que hoy se mezclan en el chat: **decidir** qué se
construye, **planificar** cómo y **ejecutar** el cambio. Cuando las tres viven en
la misma conversación, nada queda registrado y nadie puede revisar la decisión.

### Por qué importa ahora

**Recomendación.** La adopción de IA es mayoritaria y la desconfianza en su
exactitud también: el 84 % de los desarrolladores usa o planea usar IA y el 46 %
desconfía de sus resultados (Stack Overflow 2025). La evidencia sobre retrabajo y
estabilidad apunta igual (METR, GitClear, DORA 2025). El argumento no es «la IA es
mala», sino «la IA sin proceso es cara»; cada fila de la tabla de la sección 3
enlaza su fuente y la lista completa está en la sección 20.

**Decisión.** REI no es un agente más listo ni un generador de código: es el
proceso que lo rodea y la evidencia que deja.

## 3. Problema y evidencia

**Decisión.** El sitio argumenta con evidencia citada y equilibrada: reconoce que
la IA acelera tareas concretas y muestra dónde falla el proceso. Ninguna cifra
aparece sin enlace a su fuente.

### Los fallos que el sitio debe nombrar

Desarrollo a ciegas (se escribe antes de que el alcance esté claro),
alucinaciones (APIs o datos inventados presentados como ciertos), decisiones no
autorizadas (arquitectura o alcance cambiados sin aprobación), acciones fuera de
límite (entornos y datos que no se deberían tocar) y retrabajo (código rápido y
caro de corregir). Cada fallo se asocia a un límite del proceso, no a una promesa.

### Evidencia

| Caso | Qué muestra | Implicación para el relato |
|------|-------------|----------------------------|
| [**Incidente de Replit**](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure) (julio de 2025) | Un agente eliminó una base de datos de producción durante un *code freeze*, ejecutó comandos destructivos sin autorización y generó datos falsos. | Es el caso más claro de por qué hacen falta aprobación humana, entornos separados y límites de acción. |
| [**METR**](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study) (2025) | Estudio aleatorizado con desarrolladores open source experimentados: con IA tardaron un 19 % más, aunque creían haber sido un 20 % más rápidos. | La percepción de productividad no es evidencia. Hay que medir y verificar. |
| [**GitClear**](https://www.gitclear.com/ai_assistant_code_quality_2025_research) (2025–2026) | Más duplicación, más copy/paste, más *churn* y menos refactorización a medida que crece la autoría de IA. | La velocidad sin diseño degrada el mantenimiento. |
| [**Veracode**](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report) (2025–2026) | Alrededor del 45 % de las tareas de generación de código introdujeron una vulnerabilidad conocida; la seguridad no mejora necesariamente con modelos más grandes. | La revisión y los guardarraíles no son opcionales. |
| [**DORA 2025**](https://dora.dev/dora-report-2025) | La adopción de IA se asocia a más *throughput* y a menor estabilidad de entrega: la IA amplifica las fortalezas y debilidades del sistema. | El proceso existente decide el resultado, no la herramienta. |
| [**Stack Overflow 2025**](https://survey.stackoverflow.co/2025/ai) | 84 % usa o planea usar IA; 46 % desconfía de la exactitud de sus resultados y solo 3 % confía mucho. | Existe demanda de confianza verificable, no solo de velocidad. |
| [**GitHub Copilot**](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness) (2023) | En una tarea acotada, el grupo con Copilot terminó un 55,8 % más rápido. | La IA sí acelera tareas concretas; el problema es la falta de proceso. |

**Recomendación.** La home usa como máximo tres de estos datos, con enlace y en una
línea; el resto vive en una sección de contexto. Repetir cifras las desgasta.

## 4. Qué es REI y qué no es

### Qué es

- Un arnés de Spec Driven Development que vive en el repositorio del proyecto.
- Un CLI (`rei`) que inicializa el arnés, mantiene estados y valida coherencia.
- Un conjunto de roles con contrato propio: Leader, Spec Author, Implementer,
  Reviewer e Initializer.
- Un flujo con estados y una puerta de aprobación humana obligatoria.
- Un registro versionado de planificación, progreso, decisiones e historial.
- Un visor local de solo lectura y una integración con GitHub opcionales.

### Qué no es

- **No es un generador de código** ni un agente autónomo que «trabaja solo».
- **No es el repositorio del CLI**: el código de REI Harness vive en su propio
  repositorio y la web lo documenta, no lo sustituye.
- **No es el visor de specs**: `rei view` es local y de solo lectura.
- **No es un panel de control**: la web no ejecuta comandos ni modifica Work Items.
- **No es un escaparate de métricas**: sin clientes, testimonios ni cifras no
  demostrables.

### Lo que la web no debe afirmar

**Decisión.** Lista cerrada de afirmaciones prohibidas:

- Que REI elimina por completo las alucinaciones o los errores de la IA.
- Que la IA se vuelve autónoma.
- Que REI sustituye al CLI, al visor o a la documentación del repositorio.
- Cualquier métrica, testimonio, cliente o comparativa no demostrable.
- Que el flujo permite atajos: la aprobación humana no se puede omitir.

## 5. Fortalezas y diferenciadores

| Diferenciador | Qué significa | Dónde se demuestra |
|---------------|---------------|--------------------|
| **SDD desde el minuto 0** | El código no empieza hasta que existe una planificación aprobada. | `/como-funciona`, `/workflow` |
| **Aprobación humana obligatoria** | Ningún Work Item pasa a implementación sin decisión explícita; el silencio no aprueba. | `/como-funciona`, `/faq` |
| **Roles explícitos y separados** | Cada rol tiene contrato y no invade el trabajo del otro. | `/agentes` |
| **Guardarraíles** | Alcance definido, verificación obligatoria, revisión por diff y reglas duras. | `/workflow`, `/comandos` |
| **Trazabilidad** | Planificación, progreso y decisiones quedan en el repositorio, no en el chat. | `/que-es`, `/visor` |
| **Documentación viva** | La fuente de verdad es el repositorio y se actualiza con el trabajo. | `/que-es` |
| **Runtime-agnóstico** | El valor está en el contrato de rol y el CLI; el adaptador es opcional. | `/agentes`, `/instalacion` |
| **GitHub opcional** | Issues, ramas y PR son una proyección del trabajo, no la fuente de verdad. | `/github` |
| **Binario único** | Un solo ejecutable sin dependencias de runtime. | `/instalacion` |
| **Local-first** | Todo ocurre en la máquina y el repositorio del usuario; el CLI no llama a servicios externos. | `/que-es`, `/faq` |
| **Dependencias mínimas** | La plataforma y el código propio antes que librerías de terceros. | `/faq` |

**Recomendación.** La home no enumera las once. Muestra tres (especificación
primero, aprobación humana, evidencia) y enlaza al resto.

## 6. Audiencias y casos de uso

| Audiencia | Qué busca | Qué ruta le sirve |
|-----------|-----------|-------------------|
| **Desarrollador individual** | Dejar de improvisar con el agente sin montar un proceso pesado. | `/instalacion` → `/primer-work-item` |
| **Revisor / aprobador** | Ver qué se va a hacer antes de que se escriba y poder rechazarlo. | `/como-funciona`, `/workflow` |
| **Equipo con varios runtimes** | Un contrato de rol común para OpenCode, Claude Code, Cursor y Codex. | `/agentes`, `/instalacion` |
| **Mantenedor** | Referencia pública de comandos, estados y contratos. | `/comandos`, `/changelog` |
| **Escéptico** | Límites y evidencia: qué hace y qué no hace. | `/que-es`, `/faq` |

**Decisión.** Cada audiencia debe resolver su objetivo principal en un máximo de
tres clics desde la home.

**Recomendación.** El recorrido dominante es *marketing → instalación → primer Work
Item*. Las páginas de referencia se optimizan para entrada directa desde buscador,
no para navegación secuencial.

## 7. Estrategia de presentación

**Decisión.** Modelo **hub-and-spoke** con **Diátaxis** como criterio de
separación: hay un hub (la home y la landing de documentación) y radios (páginas
con un único propósito).

### Los tres modos

| Modo | Pregunta que responde | Páginas |
|------|-----------------------|---------|
| **Marketing** | ¿Qué es esto y por qué me importa? | `/`, `/que-es`, `/como-funciona` |
| **Aprendizaje** | ¿Cómo empiezo y cómo lo uso? | `/docs`, `/instalacion`, `/primer-work-item`, `/guias` |
| **Referencia** | ¿Cuál es el dato exacto? | `/comandos`, `/agentes`, `/workflow`, `/visor`, `/github`, `/changelog` |

**Decisión.** Una página pertenece a un solo modo; si necesita dos, se divide: la
referencia no explica conceptos y el tutorial no enumera opciones.

### Navegación en dos capas

1. **Capa global**: cabecera con producto, documentación y enlaces externos
   (repositorio, releases).
2. **Capa de documentación**: sidebar con el árbol del modo activo, tabla de
   contenidos de la página y navegación anterior/siguiente.

**Recomendación.** El hub de documentación (`/docs`) presenta las tres entradas
—aprender, guías, referencia— con una frase de cuándo usar cada una. Es el único
punto donde los modos se explican juntos.

## 8. Arquitectura de información y mapa del sitio

**Decisión.** Rutas públicas en español, `kebab-case`, bajo `app/(site)/`. Cada
ruta es una capa fina que compone una feature propia; ninguna ruta acumula dos
dominios.

```text
/                        # Inicio (marketing)
/que-es                  # Qué es REI (marketing)
/como-funciona           # Cómo funciona (marketing)
/docs                    # Landing de documentación (hub)
/instalacion             # Instalación (aprendizaje)
/primer-work-item        # Primer Work Item (aprendizaje)
/guias                   # Índice de guías (aprendizaje)
/guias/<slug>            # Guía concreta (aprendizaje)
/agentes                 # Roles y contratos (referencia)
/workflow                # Work Items y estados (referencia)
/visor                   # Visor local (referencia)
/github                  # Integración con GitHub (referencia)
/comandos                # CLI rei (referencia)
/faq                     # Preguntas frecuentes (soporte)
/changelog               # Versiones y cambios (soporte)
```

| Nivel de información | Rutas | Feature propuesta |
|----------------------|-------|-------------------|
| Producto | `/`, `/que-es`, `/como-funciona` | `home`, `what-is-rei`, `how-it-works` |
| Aprendizaje | `/docs`, `/instalacion`, `/primer-work-item`, `/guias` | `docs`, `installation`, `first-work-item`, `guides` |
| Referencia | `/agentes`, `/workflow`, `/visor`, `/github`, `/comandos` | `agents`, `work-items`, `viewer`, `github-integration`, `commands` |
| Soporte | `/faq`, `/changelog` | `faq`, `changelog` |

**Recomendación.** El árbol objetivo de `README.md` se mantiene; este mapa añade
`/docs`, `/primer-work-item`, `/guias` y `/changelog`, que se reflejarán allí
cuando se implementen, no antes.

## 9. Blueprint de páginas clave

| Ruta | Propósito | Bloques | CTA |
|------|-----------|---------|-----|
| `/` | Explicar en segundos qué es REI y qué problema resuelve. | Hero con tesis y dos CTA; tres diferenciadores; flujo en cinco pasos; evidencia breve; límites; CTA final. | Instalación (primario) y cómo funciona (secundario). |
| `/docs` | Hub: orientar según intención. | Tres entradas (aprender, guías, referencia) con una frase cada una; ruta recomendada; enlace a FAQ. | Instalación o primer Work Item. |
| `/instalacion` | Instalar y verificar el binario. | Requisitos; comandos por plataforma; verificación; actualización; problemas frecuentes. | Primer Work Item. |
| `/primer-work-item` | Recorrer el flujo completo una vez. | `rei init`; personalización; creación del Work Item; planificación; aprobación; implementación y revisión. | Referencia de Work Items. |
| `/como-funciona` | Mostrar el proceso y la puerta de aprobación. | Diagrama Usuario → Leader → Spec Author → aprobación → Implementer → Reviewer; estados; qué pasa si se rechaza; modo directo. | Instalación. |
| `/agentes` | Presentar los cinco roles y sus límites. | Tabla de roles; contrato y referencia de cada uno; adaptadores y *fallback*. | Workflow. |
| `/workflow` | Referencia de Work Items y estados. | Tipos (Feature/Task); tabla de estados; transiciones; bloqueos; cambios solicitados. | Comandos. |
| `/guias` | Índice de tareas concretas. | Lista por objetivo («adoptar REI en un repo existente», «revisar un Work Item»); dificultad y requisitos. | Guía concreta. |
| `/comandos` | Referencia exacta del CLI. | Tabla de comandos; flags; códigos de salida; ejemplos; enlace a documentación interna. | Changelog. |
| `/faq` | Resolver dudas y límites. | Acordeón por tema (alcance, git, checks, sesiones, varios Work Items). | Instalación o repo. |
| `/changelog` | Situar la versión actual. | Versión documentada; cambios relevantes; enlace a Releases. | Releases. |

**Recomendación.** El hero sigue el patrón de herramientas para desarrolladores:
tesis breve, una prueba visual (terminal o flujo de estados) y dos CTA; las
funcionalidades se cuentan como problemas resueltos.

## 10. Navegación y tabs

**Decisión.** Los tabs de modo de documentación son **rutas reales**, no estado de
cliente: `/docs`, `/instalacion`, `/guias`, `/comandos`. Cada uno tiene su URL,
su título y su navegación. Nunca `?tab=`.

**Decisión.** Los tabs de variante (sistema operativo, runtime) solo se usan
cuando el contenido es la misma página con distinto detalle técnico:

- Se renderizan en servidor; el contenido de todas las variantes está en el HTML.
- Si el contenido difiere más allá de los comandos, no hay tabs: se muestran los
  bloques completos o se enlaza a una página propia.
- El deep-linking usa ancla (`#linux`, `#opencode`) y funciona sin JavaScript.

Reglas: una URL canónica por página y por modo, sin duplicar contenido; el tab
activo se marca con `aria-selected` y se refleja en la URL; ningún contenido
esencial queda detrás de una interacción obligatoria.

**Recomendación.** Para instalación, mostrar los tres bloques de plataforma en la
misma página con anclas es más simple y más indexable que un selector.

## 11. Modelo de contenido y arquitectura feature-first

**Decisión.** El contenido es estático, tipado y versionado. Cada feature posee
sus datos en `features/<slug>/data/` con modelos explícitos en `types.ts`; lo
transversal (navegación, enlaces, nombre del producto) vive en `content/site.ts`.

| Modelo | Uso |
|--------|-----|
| `NavItem` | Entradas de cabecera, sidebar y pie. |
| `PageMeta` | Título, descripción, modo y orden de una página. |
| `Command` | Nombre, resumen, flags, ejemplo y códigos de salida. |
| `AgentRole` | Nombre, responsabilidad, límites y documento de referencia. |
| `WorkItemState` | Estado, significado y transiciones permitidas. |
| `Guide` | Slug, objetivo, requisitos y pasos. |
| `FaqItem` | Pregunta, respuesta y tema. |

- **Una fuente por dato**: comandos, estados y roles se declaran una vez y se
  importan. No se copian literales entre páginas.
- **Ruta fina**: `app/**/page.tsx` solo declara `metadata` y compone la feature.
- **Server Components por defecto**: el contenido se renderiza en servidor y es
  legible sin JavaScript.
- **MDX solo si se justifica**: prosa larga se modela como datos tipados. Adoptar
  MDX exige un Work Item con su dependencia y su coste.
- **Validación**: funciones puras en `lib/` comprueban enlaces internos, slugs
  únicos y campos obligatorios; se ejecutan en los tests de lógica (sección 13).

## 12. Dirección visual

**Recomendación.** Dirección óptima, no decisión cerrada —el «manual de servicio»
del visor de REI: interfaz sobria, fondo grafito cálido y acento violeta único—,
refinable antes de las fundaciones. Los roles son tokens en `app/globals.css`,
consumidos como utilidades de Tailwind (`bg-surface`, `text-muted`):

| Rol | Valor de partida |
|-----|------------------|
| Lienzo | `#14161a` |
| Superficie | `#1a1d22` |
| Superficie elevada | `#23272e` |
| Hairline | `#2b3039` |
| Texto | `#eae7e0` |
| Texto secundario | `#9aa0a8` |
| Acento | `#9a86f5` |
| Acento de acción | `#5a49c9` |
| Éxito / aviso / error / revisión | `#7fb98a` / `#e0a33a` / `#e5646b` / `#6bb0d6` |

- **Tipografía y layout**: sans legible y monoespaciada para código y estados;
  lectura de ~72 caracteres, sidebar de ~240 px y cabecera compacta.
- **Componentes, movimiento y responsive**: botón, badge, tarjeta, bloque de código,
  tabla y aviso con props tipadas; 150–200 ms con `prefers-reduced-motion`; desde
  360 px con navegación móvil accesible y código que no rompe el ancho.

**Accesibilidad.** Contraste AA en texto normal y grande; el color nunca es el único
portador de significado. Teclado completo, foco visible, HTML semántico, enlace de
salto y enlaces descriptivos; `V3` revisa teclado, contraste y responsive.

**Rendimiento y SEO.** Contenido estático y legible sin JavaScript, sin librerías de
UI que dominen el bundle. Metadata por ruta —título, descripción, canonical y Open
Graph— desde una fuente única; sitemap, robots y `llms.txt` en la sección 16.

## 13. Estrategia de tests con Jest

**Decisión.** Jest se usa **solo para lógica pura**. Sin React Testing Library,
sin `jsdom`, sin tests de componentes: la interfaz se valida con build, revisión
manual y accesibilidad.

Configuración prevista (`next/jest`, compatible con Next.js 16): `createJestConfig`
con entorno `node`, alias `@/` en `moduleNameMapper` y scripts `test` y
`test:watch`. Los tests viven junto al módulo o en `__tests__/`, en `kebab-case`.

Qué se testea: funciones puras de `lib/` (formateo, slugs, activación de
navegación, enlaces), integridad de datos tipados (identificadores únicos, campos
obligatorios, enlaces internos existentes) y transformaciones de contenido.

Qué no se testea: renderizado de componentes, estilos, snapshots de JSX y
comportamiento del navegador.

Checkpoints del proyecto:

| ID | Comando | Qué valida |
|----|---------|------------|
| `V1` | `pnpm lint` | ESLint y convenciones. |
| `V2` | `pnpm build` | Compilación, TypeScript y rutas. |
| `V3` | Revisión manual | Responsive, teclado, contraste, enlaces y contenido. |
| `V4` | `pnpm test` | Lógica pura y datos. |

**Recomendación.** `V4` se añade a `.rei/config.json` y a
`.rei/docs/project/verification.md` en el Work Item que instale Jest, junto con la
actualización del README. Mientras no exista, los checkpoints vigentes son `V1`–`V3`.

## 14. Versionado y changelog

**Decisión.** La web documenta **una sola versión**: la actual. No hay selector de
versiones, ni rutas por versión, ni conmutador en v1.

- La versión documentada se declara una vez (`content/site.ts`) y se muestra en el
  pie y en `/changelog`.
- `/changelog` resume los cambios y enlaza siempre a [GitHub Releases](https://github.com/k1wi777/REI-Harness/releases),
  la fuente canónica; la web es una proyección.
- La documentación de versiones anteriores se consulta en el repositorio.

**Abierta.** Si en el futuro hacen falta versiones antiguas, se decide con un Work
Item que defina rutas, canonical y esfuerzo de mantenimiento.

## 15. Búsqueda

**Decisión.** La búsqueda queda **pospuesta**: no forma parte del alcance de v1.
La navegación, la tabla de contenidos y una estructura de URLs predecible cubren
el caso de uso inicial con un volumen de páginas pequeño.

**Recomendación.** Opciones a evaluar cuando existan más de ~30 páginas:

| Opción | Ventaja | Coste |
|--------|---------|-------|
| **Pagefind** | Índice estático generado en build; sin servidor ni cuenta externa. | Paso extra de build; menos control de relevancia. |
| **Fuse.js** | Búsqueda en cliente con índice propio; una dependencia pequeña. | Requiere cliente, descarga del índice y límite de contenido. |
| **Algolia** | Relevancia y analítica maduras. | Servicio externo, cuenta, coste y datos fuera del repositorio. |

**Decisión.** Cualquier opción debe respetar: contenido legible sin JavaScript, sin
backend propio y sin romper la naturaleza estática. Se elige en un Work Item.

## 16. SEO, accesibilidad, rendimiento y llms.txt

**Recomendación.** Principios, no implementación. Accesibilidad, rendimiento y SEO
se concretan en la sección 12; aquí solo lo propio de la indexación:

- **Sitemap y robots**: `app/sitemap.ts` y `app/robots.ts` generados desde las rutas.
- **`llms.txt`**: archivo estático con el resumen del sitio y sus páginas
  principales, generado desde los datos tipados cuando el contenido lo justifique.

## 17. Roadmap por fases

| Fase | Alcance | Estado |
|------|---------|--------|
| **0. Base** | Scaffold, arnés inicializado, README, estrategia de producto. | Completada |
| **1. Fundaciones** | Tokens, layout raíz, cabecera, pie, navegación, shell de docs y rutas base. | Completada |
| **2. Onboarding** | Home, qué es REI, cómo funciona, instalación y primer Work Item. | Completada |
| **3. Producto** | Agentes, Work Items y estados, visor, GitHub Issues, ciclo interactivo y simulación. | Completada |
| **4. Referencia** | Comandos, guías, FAQ, changelog y tests de lógica. | Completada |
| **5. Pulido y publicación** | Responsive, accesibilidad, tipografía, evidencia real, SEO, Open Graph y `llms.txt` hechos; pendientes rendimiento, CI, despliegue y dominio. | En curso |

**Decisión.** El orden es coherente con el roadmap de `README.md`: cada fase
produce páginas completas y verificables, no esqueletos vacíos acumulados. La
fase 5 no se cierra hasta publicar y verificar el dominio real.

## 18. Riesgos y decisiones abiertas

| Riesgo | Mitigación |
|--------|------------|
| **Sobreafirmar** | Lista cerrada de afirmaciones prohibidas (sección 4) y revisión de contenido en `V3`. |
| **Confundir recomendación con decisión** | Etiquetas explícitas en todo el documento y en los Work Items. |
| **Duplicar el README** | Datos de stack y comandos viven solo en el README; la web enlaza. |
| **Cifras sin fuente** | Toda cifra externa lleva enlace; si no lo tiene, se elimina. |
| **Alcance y docs desactualizados** | Una feature por ruta y documentación que se actualiza en el mismo Work Item. |

Decisiones abiertas:

- Dirección visual: acento, tipografía y contraste de superficies.
- Búsqueda: herramienta y momento (sección 15).
- Despliegue: proveedor, dominio, canonical y variables de entorno.
- Profundidad del changelog propio frente al enlace directo a Releases.
- Necesidad real de `/guias` frente a la documentación del repositorio.

**Decisión.** Ninguna de estas cuestiones se asume por defecto en la
implementación: cada una abre su propio Work Item.

## 19. Próximo Work Item propuesto

**Recomendación.** «Fundaciones visuales y shell del sitio», como Feature:

- **Alcance**: tokens visuales en `app/globals.css`; layout raíz con fuentes;
  cabecera y pie; navegación desde `content/site.ts`; shell de documentación con
  sidebar y tabla de contenidos; rutas base con contenido mínimo; `not-found`,
  `sitemap` y `robots`.
- **Fuera de alcance**: contenido definitivo de las páginas, búsqueda, versionado,
  i18n, despliegue y tests de lógica.
- **Verificación**: `V1`, `V2` y `V3` con revisión de teclado y contraste.
- **Criterio de cierre**: una persona puede navegar el sitio completo con las
  rutas existentes, sin contenido inventado y con la dirección visual aplicada.

**Decisión.** Este Work Item no se implementa aquí: se recomienda y se planifica
por separado.

## 20. Fuentes

### Casos y estudios

- Incidente de Replit (julio de 2025), Fortune: <https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure>
- Incidente de Replit, AI Incident Database: <https://incidentdatabase.ai/cite/1152>
- METR, estudio con desarrolladores open source (2025): <https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study>
- GitClear, calidad del código con asistentes de IA: <https://www.gitclear.com/ai_assistant_code_quality_2025_research>
- GitClear, brecha de mantenibilidad: <https://www.gitclear.com/the_ai_code_quality_maintainability_gap>
- Veracode, informe de seguridad de código generado por IA: <https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report>
- DORA 2025: <https://dora.dev/dora-report-2025>
- DORA 2025, anuncio: <https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report>
- Stack Overflow Developer Survey 2025, IA: <https://survey.stackoverflow.co/2025/ai>
- Stack Overflow, nota de prensa de la encuesta 2025: <https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey>
- GitHub Copilot, impacto en productividad (2023): <https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness>

### Patrones de producto y documentación

- Evil Martians, análisis de landing pages de herramientas para desarrolladores: <https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025>
- Mintlify, buenas prácticas de documentación para desarrolladores: <https://www.mintlify.com/library/developer-documentation-best-practices>
- Diátaxis: <https://diataxis.fr/>
- Astro Docs: <https://docs.astro.build/>
- Stripe Docs: <https://docs.stripe.com/>
- Supabase: <https://supabase.com/>
- Linear: <https://linear.app/>
- Raycast: <https://www.raycast.com/>
- Vercel: <https://vercel.com/>
- shadcn/ui Docs: <https://ui.shadcn.com/docs>
- Tailscale: <https://tailscale.com/>
- Resend: <https://resend.com/>

### Referencias internas

`README.md` (producto, stack, roadmap), `AGENTS.md` (propósito y workflow),
`.rei/docs/project/architecture.md` y `conventions.md`. El producto canónico es
[REI Harness](https://github.com/k1wi777/REI-Harness).
