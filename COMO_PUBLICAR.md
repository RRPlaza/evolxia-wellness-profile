# EVOLXIA® Wellness Profile — Guía para publicarlo en internet

Este es un proyecto web completo y ya probado (compila sin errores). Sigue estos pasos
en orden. No necesitas saber programar, solo seguir los clics.

---

## PASO 1 — Crear cuenta en GitHub (donde vivirá tu código)

1. Ve a https://github.com/signup
2. Crea una cuenta gratis con tu correo.
3. Confirma tu correo cuando te llegue el email de verificación.

## PASO 2 — Subir este proyecto a GitHub

1. Una vez dentro de GitHub, dale clic al botón verde **"New"** (o el ícono "+" arriba a la derecha → "New repository").
2. Ponle de nombre: `evolxia-wellness-profile`
3. Déjalo en "Public" o "Private" (cualquiera funciona para Vercel).
4. NO marques ninguna casilla de "Add README" — déjalo vacío.
5. Dale "Create repository".
6. GitHub te mostrará una página con comandos. Ignóralos — en su lugar busca el enlace
   que dice **"uploading an existing file"** (subir un archivo existente).
7. Arrastra TODOS los archivos y carpetas de este ZIP descomprimido a esa página
   (excepto la carpeta `node_modules` si llegara a aparecer, no la subas).
8. Dale "Commit changes" abajo.

## PASO 3 — Crear cuenta en Vercel (donde vivirá tu app online)

1. Ve a https://vercel.com/signup
2. Elige **"Continue with GitHub"** — así conecta automáticamente tu cuenta.
3. Autoriza la conexión cuando te lo pida.

## PASO 4 — Publicar el proyecto

1. En el panel de Vercel, dale clic a **"Add New..." → "Project"**.
2. Busca y selecciona el repositorio `evolxia-wellness-profile` que subiste.
3. Vercel detecta automáticamente que es un proyecto Vite — no cambies nada en la
   configuración que te muestra.
4. Dale clic a **"Deploy"**.
5. Espera 1-2 minutos. Cuando termine, Vercel te da un link como:
   `https://evolxia-wellness-profile.vercel.app`

¡Listo! Ese link ya es tu app pública, funcionando desde cualquier celular o computadora,
sin pasar por Claude.

---

## PASO 5 (opcional) — Usar tu propio dominio (ej. evolxia.com)

Si ya tienes o compras un dominio (en Namecheap, GoDaddy, etc.):

1. En Vercel, entra a tu proyecto → pestaña **"Settings" → "Domains"**.
2. Escribe tu dominio (ej. `app.evolxia.com`) y dale "Add".
3. Vercel te da 1-2 registros DNS para copiar.
4. Ve a donde compraste el dominio → sección DNS → pega esos registros.
5. Espera entre 10 minutos y un par de horas a que se propague.

---

## Actualizaciones futuras

Cada vez que quieras cambiar algo en la app (colores, textos, lo que sea), solo
tienes que:
1. Pedirle a Claude el archivo actualizado.
2. Subir el archivo nuevo a GitHub (reemplazando el viejo) desde la misma página
   donde subiste los archivos originalmente.
3. Vercel detecta el cambio automáticamente y publica la nueva versión en 1-2 minutos.
   No tienes que repetir el proceso de Vercel, solo el de GitHub.

---

## Costos

- GitHub: gratis.
- Vercel: gratis para uso personal/negocio pequeño (plan "Hobby"). Si tu app recibe
  muchísimo tráfico (miles de visitas diarias) eventualmente Vercel te pedirá pasar al
  plan "Pro" (~$20 USD/mes), pero para empezar no es necesario.
