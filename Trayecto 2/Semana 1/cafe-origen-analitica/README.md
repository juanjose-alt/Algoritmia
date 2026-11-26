Café Origen - Motor de Analítica v1.0

Motor de procesamiento y análisis de datos de ventas de alta eficiencia para la optimización comercial de Café Origen, desarrollado en Node.js y certificado para cumplir con los estándares de rendimiento del marketplace.

Descripción del Producto

Este motor permite procesar transacciones comerciales a gran escala (desde lotes base de prueba hasta más de 100,000 registros en menos de un segundo). Implementa algoritmos optimizados de tiempo lineal O(n) utilizando estructuras nativas como Set y Map, técnicas de ventana deslizante y patrones de complementos para resolver campañas comerciales y auditorías de rendimiento técnico.

¿Cómo Ejecutarlo?

Asegúrate de tener instalado Node.js en tu equipo.

    Ejecutar el reporte general con los datos oficiales del Día 1:
    node src/reporte.js

    Ejecutar el reporte con un lote masivo simulado (ej. 100.000 ventas):
    node src/reporte.js 100000

    Ejecutar pruebas individuales de analítica:
    node src/test.js

    Ejecutar las comparativas de rendimiento (Big O):
    node src/medir.js
    node src/medir-recurrentes.js

Preguntas de Negocio que Responde

El motor procesa la información para responder de forma automática y precisa a las siguientes necesidades de la gerencia y el equipo comercial:

Finanzas y Operación:

    ¿Cuánto es el total vendido y las unidades totales acumuladas?

    ¿Cuál es el ticket promedio por transacción válida?

    ¿Cuánto se factura por cada ciudad (normalizando variaciones de escritura)?

    ¿Cuáles son los productos más vendidos y el top 3 de mayor valor?

    ¿Cómo se comportan las ventas en un día específico con o sin transacciones registradas?

Campañas y Marketing de Fin de Año:

    ¿Quiénes son los clientes recurrentes que han comprado más de una vez en el historial?

    ¿Cuál es el producto estrella (más vendido) en cada ciudad?

    ¿Qué dos productos del catálogo combinan exactamente para armar una tarjeta regalo de $87.000?

    ¿Quién fue el primer cliente de la temporada con una sola compra para enviarle un cupón de regreso?

    ¿Cuál fue el período de 7 días consecutivos (mejor semana) con mayor facturación del último mes?

    ¿Cuál es el par de productos más cercano a un presupuesto corporativo sin superarlo?
    
Estructura del Proyecto

cafe-origen-analitica/
│
├── src/
│   ├── analitica.js     # Núcleo de funciones de cálculo, agregación y optimizaciones (v1.0)
│   ├── catalogo.js      # Catálogo oficial de productos y precios para campañas
│   ├── datos.js         # Registros oficiales de transacciones del Día 1 (Casos borde incluidos)
│   ├── explorar.js      # Script de exploración inicial de datos
│   ├── generador.js     # Fábrica de datos sintéticos para pruebas de carga (Big O)
│   ├── medir.js         # Mediciones de operaciones para O(1) y O(n)
│   ├── medir-recurrentes.js # Comparativa de rendimiento entre fuerza bruta y Set/Map
│   ├── reporte.js       # Script principal de consolidación e impresión de informes ejecutivos
│   └── test.js          # Pruebas unitarias de indicadores clave
│
├── bitacora.md          # Registro diario de aprendizaje, trazas y decisiones técnicas
├── RENDIMIENTO.md       # Auditoría técnica detallada, complejidades y proyecciones de escala
└── README.md            # Documentación oficial del producto
```