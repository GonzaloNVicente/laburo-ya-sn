# Laburapp San Nicolás

Creá un prototipo navegable (solo frontend, SIN backend ni base de datos) de una web app 

mobile-first llamada "Laburapp" para San Nicolás de los Arroyos, Argentina. Conecta a 

trabajadores de oficio (pintores, albañiles, electricistas, plomeros, gasistas, herreros, 

jardineros, fletes) con vecinos y comercios que necesitan un trabajo.

Usá datos de ejemplo guardados en el código (trabajadores, trabajos y postulaciones 

inventados) para que todas las pantallas se vean llenas y se puedan navegar. Más adelante 

se va a conectar a una base de datos, así que mantené los datos separados en un archivo 

aparte.

USUARIOS CLAVE: trabajadores de oficio que usan el celular solo para WhatsApp y Facebook. 

Poca experiencia con apps. Todo tiene que ser tan simple como WhatsApp.

APPS DE REFERENCIA (tomá solo lo indicado de cada una):

- WhatsApp: la simplicidad. Listas limpias, pocos elementos, el verde para la acción de contactar.

- Airtasker: el flujo de publicar un trabajo en pasos cortos y recibir ofertas con precio.

- TaskRabbit: cómo se muestra el perfil del trabajador (foto, estrellas, cantidad de trabajos, 

  precio) para elegir con confianza.

- PedidosYa / Rappi: la grilla de categorías con íconos grandes y coloridos en la pantalla 

  de inicio.

- Mercado Libre: las tarjetas simples y familiares para el público argentino, y el formato 

  de precios.

- Uber: una sola acción principal por pantalla, botón grande abajo.

REGLAS DE DISEÑO (obligatorias):

- Pensado para celular. Botones grandes (mínimo 56px de alto), fáciles de tocar con el dedo.

- Una sola acción principal por pantalla. Nada de menús complicados ni filtros.

- Letra grande (mínimo 18px), alto contraste, español argentino simple ("vos", "publicá", "elegí").

- Cada botón con ícono + texto corto. Nada de palabras técnicas.

- Escribir lo menos posible: elegir de opciones con botones grandes (oficio, zona) en vez de escribir.

- Permitir subir fotos del trabajo en vez de describirlo con texto.

- Colores: fondo blanco, azul oscuro como color principal y amarillo para el botón más 

  importante. Verde solo para WhatsApp. Nada de gradientes ni decoraciones.

- Ingreso simulado con número de celular (pantalla de número + código), sin email ni contraseña.

PANTALLA DE INICIO: dos botones gigantes:

  1) "Necesito un trabajador"  2) "Soy trabajador, busco trabajo"

FLUJO CLIENTE (vecino o comercio):

  1. Elegir el oficio tocando un ícono grande (Pintura, Electricidad, Plomería, Gas, 

     Albañilería, Carpintería, Herrería, Jardinería, Limpieza, Fletes, Otro).

  2. Subir 1-3 fotos + una frase corta de qué hay que hacer.

  3. Elegir zona (Centro, Zona Norte, Zona Sur, Zona Oeste, Costanera) y para cuándo 

     (Hoy / Esta semana / Sin apuro).

  4. Precio que ofrece (opcional).

  5. Publicar. Ver los trabajadores que se postularon (foto, nombre, estrellas, 

     "Verificado", precio) y tocar "Elegir".

  6. Al elegir, aparece un botón grande verde "Hablar por WhatsApp" que abre wa.me con un 

     mensaje ya escrito.

  7. Cuando termina el trabajo: "¿Cómo trabajó?" con 5 estrellas grandes y comentario opcional.

FLUJO TRABAJADOR:

  1. Registro en 3 pasos cortos: nombre, oficio (íconos), zona, foto de perfil opcional, 

     "¿Hacés factura?" Sí/No.

  2. Pantalla principal: trabajos de SU oficio y zona como tarjetas grandes con foto, zona, 

     cuándo y precio ofrecido.

  3. En

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://laburo-ya-sn.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fe0fa517-7ab9-47ae-b581-22e4b8d5a420).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
