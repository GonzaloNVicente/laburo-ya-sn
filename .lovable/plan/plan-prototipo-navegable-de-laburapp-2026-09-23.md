# Plan: prototipo navegable de Laburapp

## Objetivo
Crear una app mobile-first, solo frontend, con datos ficticios separados y recorridos completos para vecinos/comercios y trabajadores de oficio de San Nicolás.

## Pantallas y recorridos
- Inicio con las dos decisiones principales: buscar trabajador o buscar trabajo.
- Ingreso simulado por celular con código de área 336 y validación por código.
- Cliente: elegir oficio, agregar fotos y una frase, elegir zona y fecha, precio opcional, revisar y publicar.
- Cliente: ver postulaciones completas, elegir trabajador, abrir WhatsApp con mensaje preparado y calificar al finalizar.
- Trabajador: registro breve en tres pasos, con nombre, oficio, zona, foto opcional y factura Sí/No.
- Trabajador: listado de trabajos relevantes, detalle, postulación con precio y confirmación.
- Trabajador: “Mis trabajos” con postulaciones y trabajos ganados, incluyendo contacto por WhatsApp.

## Diseño
- Interfaz clara y familiar: fondo blanco, azul oscuro, amarillo para la acción principal y verde exclusivo para WhatsApp.
- Tipografía grande, botones táctiles de al menos 56 px, una acción destacada por pantalla y textos en español argentino simple.
- Categorías con íconos grandes, tarjetas de trabajos y perfiles con señales claras de confianza.
- Navegación inferior mínima cuando corresponda, más barra superior con volver.
- Adaptación cuidada a celular y escritorio, manteniendo el celular como experiencia principal.

## Datos y comportamiento
- Guardar trabajadores, trabajos, postulaciones, zonas y oficios ficticios en un archivo de datos independiente.
- Mantener en memoria las elecciones del usuario para que publicar, postularse, elegir y calificar se sientan reales durante la sesión.
- Usar selectores de archivos locales con previsualización para las fotos, sin subirlas a ningún servicio.
- Abrir enlaces `wa.me` con números de ejemplo del código 336 y mensajes ya escritos.

## Verificación
- Recorrer ambos caminos completos en la app.
- Revisar legibilidad, botones, navegación, desbordes y estados elegidos en tamaño celular y escritorio.
- Confirmar que no haya errores visibles ni enlaces sin destino.
