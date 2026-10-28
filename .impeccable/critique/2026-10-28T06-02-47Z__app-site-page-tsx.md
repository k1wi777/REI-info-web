---
target: Home de REI Web
total_score: 24
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
p2_count: 4
target_identity: "file:/home/jose/Documentos/rei-web/app/(site)/page.tsx"
target_fingerprint: "sha256:b3786d5be12c387a1551c1f428f1d23e60fe6eaccff46157f003694b4a8ce835"
target_path: /home/jose/Documentos/rei-web/app/(site)/page.tsx
timestamp: 2026-10-28T06-02-47Z
slug: app-site-page-tsx
---
# Crítica de diseño — Home de REI Web

**Objetivo:** `app/(site)/page.tsx` (`/`, modo Persuade) · destino medido: `http://localhost:3000/`
**Brief del usuario:** minimalista, elegante y profesional; tipografía de texto no demasiado pequeña.

## Veredicto de especificidad

La home sí está autorada para este producto. La hoja de grafito con retícula de plano, la matriz de responsabilidades y la banda de aprobación no se pueden trasladar a otro SaaS sin que se rompa el significado: la puerta es la forma, no un adorno. La paleta hace un trabajo disciplinado —violeta solo en la aprobación, verde solo en `done`, todo lo demás hairline— y la pareja Archivo Expandido + Geist Mono da carácter de ficha técnica sin caer en la estética genérica de startup de IA.

Donde deja de ser específica es dentro de su propio ritmo: ocho cabeceras idénticas (etiqueta mono + tesis de 44 px + deck a la derecha) hacen que los actos se lean como una plantilla repetida. La página tiene mundo propio; le falta variación estructural entre actos.

## Tipografía medida (1440 / 390 px)

| Tamaño | Rol real | Instancias | Veredicto |
|---|---|---|---|
| 72 px Archivo | tesis del hero | 3 | Correcto |
| 44 px Archivo | tesis de sección | 9 | Correcto |
| 24 px Archivo | títulos de columna y nodos | 8 | Correcto |
| 17 px Geist | deck del hero | 10 | Correcto |
| 16 px Geist | cuerpo de secciones y demos | 32 | Correcto, aunque 1 px por debajo del token `--text-body` |
| 16 px Geist 500 | títulos de paso | 19 | Correcto |
| 15 px Geist 500 | botones | 4 | Correcto |
| 13 px Geist | notas al pie, pies de figura | 41 | **Bajo el suelo cómodo** |
| 12.5 px Geist Mono | código, terminal, diff | — | Aceptable en contexto de terminal |
| 12 px Geist Mono | navegación superior | 3 | **Pequeño para nav principal** |
| 10 px Geist Mono | metadata, estados, cotas | 53 | **Pequeño** |
| 9.5 px Geist Mono | metadata fina, matriz, pasos | 93 | **Demasiado pequeño** |

**Total: 146 instancias de texto por debajo de 11 px.** Muchas son etiquetas decorativas legítimas (cotas de plano, `01`, `REV. 03`), pero otras cargan significado: nombres de estado (`pending`, `in_progress`), cabeceras de rol de la matriz, etiquetas de divulgación (`RESPONSABILIDAD Y LÍMITE`), la versión del pie y la escala de estados. En un móvil de 390 px esos 9.5 px son físicamente 9.5 px: el usuario tiene que acercarse para leer el mecanismo que la página dice demostrar. Eso contradice el brief.

## Tabla de heurísticas

| # | Heurística | Puntuación | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Nav activa y `actual: ready`, pero no hay progreso de lectura en 9 511 px |
| 2 | Lenguaje del mundo real | 4 | Estados, roles y CLI reales; español directo |
| 3 | Control y libertad | 3 | Sin modales ni trampas; falta volver arriba en móvil (15 866 px) |
| 4 | Consistencia | 4 | Sistema visual muy coherente; solo 16/17 px conviven sin motivo |
| 5 | Prevención de errores | 3 | No hay acciones destructivas; enlaces externos marcados ↗ |
| 6 | Reconocer antes que recordar | 4 | Todo etiquetado con texto, sin iconos solos |
| 7 | Flexibilidad y eficiencia | n/a | Landing estática: no aplica |
| 8 | Diseño estético y minimalista | 3 | Muy limpio, pero largo y con microtipo que compite |
| 9 | Recuperación de errores | n/a | No existen estados de error en la home |
| 10 | Ayuda y documentación | n/a | La documentación es el producto; el CTA ya lleva a ella |

**Total: 24/28 (86 %) — Good.** Base sólida; los arreglos son de suelo tipográfico y de comportamiento móvil, no de dirección.

## Carga cognitiva

Falla 2 de 8: **jerarquía** (la escala de 44 px se repite en los ocho actos, así que ningún acto pesa más que otro) y **divulgación progresiva** (la home completa despliega el mecanismo entero; no hay camino corto). Pasan: foco único por bloque, agrupación por columnas, ≤4 opciones por decisión (nav: 3 + CTA; héroe: 2 CTA), sin memoria entre pantallas.

## Viaje emocional

Pico inicial fuerte: «Tu agente escribe. Tú decides.» + la matriz con la banda violeta explican el producto en menos de cinco segundos. El valle llega en el acto de problema: dos columnas de cinco pasos cada una, con el mismo ritmo visual, convierten una idea potente en una lista larga. La recuperación es buena en la puerta y en la terminal, que son las demos más convincentes. El cierre vuelve a subir. El final es correcto pero no tan memorable como el inicio.

## Qué funciona

1. **El hero es el producto.** La matriz de responsabilidades con la banda de aprobación violeta no es una ilustración: es el mecanismo, legible, con estados reales. La tesis y la prueba están en el mismo plano.
2. **Disciplina cromática.** El violeta solo aparece donde hay una puerta humana y el verde solo en `done`; el resto es grafito y hairline. Eso es elegancia estructural, no decoración.
3. **Tipografía con carácter.** Archivo Expandido da autoridad de documento y Geist Mono convierte la metadata en ficha técnica. El cuerpo a 16–17 px se lee cómodo; el problema es el suelo, no el cuerpo.

## Problemas prioritarios

### [P1] El microtipo carga significado y está por debajo del brief
- **Qué:** 146 usos de 9.5–10 px; nav a 12 px; notas a 13 px. En móvil, los estados del ciclo, las cabeceras de rol y las etiquetas de divulgación se leen a 9.5 px.
- **Por qué importa:** el mecanismo que la web demuestra —estados, roles, puerta— depende de texto que el usuario tiene que esforzarse en leer. El brief pide explícitamente texto no demasiado pequeño.
- **Arreglo:** subir el suelo sin perder el aire de ficha: `--text-meta` 10 → 11.5 px, `--text-meta-sm` 9.5 → 11 px, `--text-nav` 12 → 13 px, `--text-code` 12.5 → 13 px, `--text-caption` 13 → 14 px. Mantener mayúsculas y tracking; revisar solo los huecos que se rompan (matriz, escala de estados).
- **Comando:** `/impeccable typeset`

### [P2] La escala de estados se solapa en móvil
- **Qué:** a 390 px, `in_progress` termina en x=227 y `review` empieza en x=231: 4 px de separación. Se lee «IN_PROGRESSREVIEW».
- **Por qué importa:** es el ciclo de vida del producto; dos estados distintos parecen uno.
- **Arreglo:** permitir dos filas en móvil (`flex-wrap` con `gap` mínimo de 12 px) o reducir el tracking y reservar un ancho mínimo por etiqueta. No reducir el tamaño: el punto anterior va en la dirección contraria.
- **Comando:** `/impeccable adapt`

### [P2] El esquema de encabezados mezcla la página con el cromo de las demos
- **Qué:** el `h1` es correcto, pero el outline incluye `H2 Matriz de responsabilidades`, `H2 Estados del ciclo`, `H3 FICHA`, `H3 Diff` y los títulos de las issues como `H3`.
- **Por qué importa:** quien navega por encabezados con lector de pantalla recibe secciones falsas y pierde la estructura real de los actos.
- **Arreglo:** reservar `h2` para los actos y las tesis; los títulos internos de ventanas y las leyendas de captura pasan a `p`/`figcaption` (o `div` con estilo), conservando el texto visible.
- **Comando:** `/impeccable harden`

### [P2] Las capturas de evidencia son ilegibles en móvil
- **Qué:** las tres ventanas de GitHub se reducen a ~80 px de alto y el texto interno queda a 3–4 px; la captura del visor se sirve a 350 px de ancho. No hay forma de abrir la captura completa.
- **Por qué importa:** la sección de evidencia es el argumento de confianza; en móvil se convierte en decoración. El enlace a la issue mitiga, pero la captura no prueba nada.
- **Arreglo:** en móvil mostrar solo el recorte de cabecera a escala nativa, o añadir un enlace «Ver captura completa» que abra el PNG; mantener las tres ventanas en escritorio. Nunca ampliar una captura hasta hacerla ilegible.
- **Comando:** `/impeccable adapt`

### [P2] Objetivos táctiles por debajo de 24 px
- **Qué:** nav superior 12 px de alto, enlaces del pie 21 px, marca 22 px, enlaces de texto 17 px. WCAG 2.2 AA (2.5.8) pide 24×24 para objetivos no inline.
- **Por qué importa:** en móvil se falla el toque, sobre todo en el pie y en «Abrir la issue».
- **Arreglo:** añadir `py-1.5`/`min-h-6` a nav, marca y enlaces del pie sin cambiar el tamaño del texto ni la línea visible.
- **Comando:** `/impeccable audit`

### [P3] Ocho actos con la misma cabecera y el mismo peso
- **Qué:** todos los `h2` miden 44 px y todas las cabeceras repiten etiqueta + tesis + deck; los fondos de acto (`#0A0A0B`, `#0E0E10`, `#111114`) se distinguen muy poco.
- **Por qué importa:** el minimalismo se vuelve monotonía; el lector no siente avanzar entre problema, proceso y evidencia.
- **Arreglo:** elegir un solo recurso de separación —por ejemplo, número de acto a mayor escala y regla más marcada— y aplicarlo; no añadir adornos.
- **Comando:** `/impeccable layout`

### [P3] La terminal se corta sin affordance en móvil
- **Qué:** el bloque de código mide 736 px dentro de 350 px; el texto se corta a media palabra y el `fade-right` no se percibe.
- **Por qué importa:** parece contenido roto, no desplazable.
- **Arreglo:** hacer visible el degradado en el borde derecho y añadir una nota «desliza para ver la línea completa», o permitir el ajuste de línea de los identificadores.
- **Comando:** `/impeccable adapt`

## Banderas por persona

**Jordan (primeriza):** la nav a 12 px y las etiquetas a 9.5 px le obligan a esforzarse antes de entender nada. Los disclosures de rol («RESPONSABILIDAD Y LÍMITE» en 10 px) parecen separadores, no controles: no descubre los límites que la página dice mostrar. Se salva por el deck del hero, que sí explica el producto en lenguaje llano.

**Riley (probador):** en móvil encuentra los estados solapados, la terminal cortada a media palabra y capturas que no puede verificar. Concluye que la evidencia es ornamental.

**Casey (móvil):** 15 866 px de página sin volver arriba, objetivos de 12–21 px y tres ventanas de GitHub ilegibles. Abandona en el acto de evidencia, justo donde debía convencerse.

## Observaciones menores

- Solo un fallo de contraste: el separador decorativo `·` en `text-muted` (3.74:1). Es `aria-hidden` y no es texto real; no requiere cambio. Todo el texto de prosa pasa AA.
- Sin desbordamiento horizontal de página en 1440 ni 390 px. El único scroll interno es la terminal, y es correcto.
- El cuerpo de las demos mide 16 px y el deck del hero 17 px. No se nota, pero el token dice 17; unificarlo es gratis.
- Las capturas cargan con `next/image` y carga diferida; en la captura de página completa aparecían vacías hasta hacer scroll, artefacto de Playwright, no un fallo del sitio.
- 35 elementos interactivos en toda la página: la disciplina de opciones es excelente para una landing.

## Preguntas para pensar

- ¿Qué pasaría si la home conservara solo tres demos —matriz/puerta, terminal y visor— y el resto viviera en docs? ¿Se sentiría más segura y más minimalista, o perdería prueba?
- ¿Y si el suelo tipográfico subiera a 11–12 px y la hoja ganara aire en vez de densidad? La estética de ficha técnica no depende de que el texto sea diminuto.
- ¿Cada acto necesita la misma cabecera, o el cambio de acto podría ser un cambio de escala?
