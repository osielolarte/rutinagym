# Control de Rutina (4 Días)

Esta es una aplicación web simple para registrar y seguir un programa de entrenamiento de 4 días por semana, basado en bloques de 4 semanas. Permite registrar pesos, repeticiones, marcar series y ejercicios como completados, usar sustituciones, tomar notas y guardar el historial de entrenamientos en el almacenamiento local del navegador.

## Características

* **Programa de 12 Semanas:** Estructurado en 3 bloques de 4 semanas cada uno.
* **División de 4 Días:** Tren Superior A, Tren Inferior A, Tren Superior B, Tren Inferior B.
* **Seguimiento Detallado:** Registra peso y repeticiones para cada serie.
* **Marcadores de Progreso:** Marca series y ejercicios completos.
* **Sustituciones:** Opción de seleccionar ejercicios alternativos.
* **Notas:** Añade notas específicas para cada ejercicio.
* **Temporizador de Descanso:** Inicia un temporizador basado en el descanso recomendado.
* **Historial Local:** Guarda las rutinas completadas en el almacenamiento local del navegador.
* **Modo Oscuro:** Interfaz adaptable a preferencias de luz/oscuridad.
* **Navegación por Semanas:** Muévete fácilmente entre las 12 semanas del programa.

## Cómo Usar

1.  Abre el archivo `index.html` en tu navegador web.
2.  La aplicación cargará la Semana 1, Día "Superior A" por defecto.
3.  Usa los botones de navegación de pestañas ("Superior A", "Inferior A", etc.) para cambiar de día.
4.  Usa los botones de flecha (< >) en la parte superior para cambiar de semana.
5.  Introduce el peso y las repeticiones realizadas en los campos correspondientes para cada serie.
6.  Marca la casilla junto a cada serie completada.
7.  Marca la casilla en la esquina superior derecha del ejercicio cuando lo hayas completado.
8.  Si necesitas usar una sustitución, selecciónala del menú desplegable.
9.  Añade notas si es necesario en el campo de notas.
10. Usa el botón de play (▶️) junto a una serie para iniciar el temporizador de descanso recomendado.
11. Cuando termines la rutina del día, haz clic en "Guardar Rutina" para almacenar el progreso en el historial y limpiar los campos para la próxima vez.
12. Usa "Limpiar Actual" si quieres borrar los datos introducidos sin guardarlos en el historial.
13. El historial de rutinas guardadas se muestra en la parte inferior de la página.
14. Usa el botón de sol/luna para cambiar entre modo claro y oscuro.

## Tecnologías Utilizadas

* HTML5
* CSS3 (con Tailwind CSS para utilidad rápida)
* JavaScript (Vanilla JS)
* Almacenamiento Local del Navegador (LocalStorage)

