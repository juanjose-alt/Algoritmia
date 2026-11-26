Noviembre 23/2026



Bitácora - Reto 1: Café Origen



arranqué con este reto. Estuve revisando los datos antes de tirar código o fórmulas, porque como dice el líder técnico, si los datos vienen mal desde el inicio, todo lo demás sale mal. Aquí dejo mis apuntes de lo que encontré.



Diccionario de datos



- id: el número de cada venta, va del 1 al 12 en orden cronológico.

- fecha: el día en que se hizo la compra (primeros días de septiembre de 2026).

- cliente: el código del cliente (como C01, C02). Ojo, vi que un mismo cliente se puede repetir.

- producto: el artículo que compraron (café de Huila, Nariño, Sierra, prensa francesa o molino).

- ciudad: de dónde es el pedido (Bogotá, Medellín, Cali, Pereira).

- cantidad: cuántas unidades se llevaron en esa compra.

- precio: cuánto cuesta una unidad de ese producto en pesos.



Casos borde detectados



- El "medellín" con minúscula en el registro 5: en casi todos dice "Medellín" con mayúscula. Para JavaScript eso cuenta como cosas distintas, así que tengo que unificarlo en la limpieza.

- La cantidad 0 en el registro 8: el cliente C06 compró en Cali pero la cantidad es cero. ¿Fue un error al escribir el reporte o una venta cancelada? Hay que tener cuidado con esto al calcular totales de unidades o ingresos.

- Clientes repetidos en fechas distintas: al principio pensé que cada cliente salía una sola vez en todo el archivo, pero el C01 aparece varias veces. Esto es un historial de transacciones, no una lista de usuarios únicos.







Nov 23-2026 



Pseudocodigo de cada indicador(pseint):



// 1. Calcular el valor de una venta individual

SubProceso resultado <- valorVenta(cantidad, precio)

    Definir resultado Como Real

    resultado <- cantidad * precio

FinSubProceso



// 2. Calcular el total vendido acumulando las ventas

SubProceso total <- totalVendido(cantidades, precios, n)

    Definir total Como Real

    Definir i Como Entero

    total <- 0

    

    Para i <- 1 Hasta n Hacer

        total <- total + (cantidades[i] * precios[i])

    FinPara

FinSubProceso



// 3. Calcular el total de unidades vendidas (contador/acumulador)

SubProceso totalU <- unidadesVendidas(cantidades, n)

    Definir totalU Como Entero

    Definir i Como Entero

    totalU <- 0

    

    Para i <- 1 Hasta n Hacer

        // Ojo aquí: podemos ignorar o sumar según la regla del registro 8

        totalU <- totalU + cantidades[i]

    FinPara

FinSubProceso



// 4. Encontrar la venta mayor (patrón de máximo)

SubProceso mayor <- ventaMayor(cantidades, precios, n)

    Definir mayor Como Real

    Definir i Como Entero

    Definir actual Como Real

    

    Si n == 0 Entonces

        Escribir "El arreglo está vacío"

        mayor <- 0

    Sino

        mayor <- cantidades[1] * precios[1]

        Para i <- 2 Hasta n Hacer

            actual <- cantidades[i] * precios[i]

            Si actual > mayor Entonces

                mayor <- actual

            FinSi

        FinPara

    FinSi

FinSubProceso



// 5. Calcular el ticket promedio (evitando división por cero)

SubProceso promedio <- ticketPromedio(cantidades, precios, n)

    Definir promedio, total Como Real

    Definir ventasValidas, i Como Entero

    

    total <- 0

    ventasValidas <- 0

    

    Para i <- 1 Hasta n Hacer

        Si cantidades[i] > 0 Entonces

            total <- total + (cantidades[i] * precios[i])

            ventasValidas <- ventasValidas + 1

        FinSi

    FinPara

    

    Si ventasValidas > 0 Entonces

        promedio <- total / ventasValidas

    Sino

        promedio <- 0

    FinSi

FinSubProceso



==========Noviembre 24-2026=============

Bitácora - Reto 2 (Café Origen):



Aprendizaje clave: Entendí cómo funciona el ciclo for...of para recorrer arreglos automáticamente sin enredos de índices (i++), viendo claramente la diferencia entre la colección (ventas) y el elemento actual (venta).



Depuración: Me tropecé con un ReferenceError en ventaMayor por intentar usar la variable venta fuera de su ámbito (fuera del ciclo). Aprendí que el return debe entregar la variable del mayor y estar siempre afuera del bucle. 









Reto 3 ======== Dia 1 



Bitácora - Reto 3 (Métodos y Verificación):



    Lo que me costó: Se me dificultó un poco entender cómo estructurar las comparaciones entre los ciclos y los métodos nuevos (reduce y filter), pero ver que ambos caminos llegan al mismo resultado me ayudó a aterrizar cómo funcionan por debajo.



    El error tonto del día: Me comí una coma al importar las funciones en test.js justo antes de ventaMayor y por eso no me cargaba el archivo; me tocó revisar línea por línea hasta pillar el fallo de sintaxis.



    Resumen de colecciones: Recorrí el arreglo ventas, filtré ciudades limpiando espacios con .trim().toLowerCase(), transformé objetos con Object.entries().map(), acumulé con .reduce() y agrupé usando objetos como diccionarios. Al final todo dio "OK" en verificar.js.











    reto 4 ------- Dia 1



    Registro de Depuración (v0.1):



    El caso de Bogotá repetida dos veces:



        ¿Qué pasaba?: En el reporte la ciudad "Bogotá" salía duplicada porque en los datos crudos unos registros tenían un espacio extra ("Bogotá ") o estaban en minúscula ("bogota"), y el programa los trataba como si fueran ciudades totalmente diferentes.



        La solución: Me tocó aplicar un trim() y toLowerCase() al momento de armar el diccionario para limpiar el texto y obligar a que todo quedara estandarizado bajo una sola clave.



    NaN en el ticket promedio:



        ¿Qué pasaba?: Cuando me puse a probar un día que no tenía ventas registradas, el cálculo del ticket promedio se rompía y arrojaba un NaN (Not a Number) en la consola.



        La causa: Básicamente era una división por cero (intentar dividir el dinero total entre 0 transacciones).



        La solución: Le agregué una validación o "guarda" al código para que compruebe primero si hay ventas; si el contador da cero, que devuelva un 0 limpio de una vez en lugar de intentar hacer la división prohibida.







Nov 25 - 2026 ----------------------

MiniReto 5: Rendimiento, GEnerador de Datos y Big O

El problema inicial:

Con las 12 ventas de prueba del Día 1 no podía medir nada real. Así que me tocó construir una "fábrica" de datos (generador.js) para inventarme hasta 100,000 ventas y ver cuántos pasos exactos hace la computadora al procesarlas.Mis predicciones:

Antes de correr las pruebas, pensé: "Si multiplico los datos por 10 (pasar de 1,000 a 10,000 registros), el trabajo de las funciones de búsqueda y suma también se va a multiplicar exactamente por 10, porque les toca recorrer la lista elemento por elemento".



La función de primeraVenta se mantuvo en 1 solo paso sin importar si le pasaba 100 o 100,000 datos.



primeraVenta es O(1) (Constante): Va directo al grano (al índice 0) sin importar qué tan gigante sea la base de datos.



totalVendido y ventaMayor son O(n) (Lineales): Les toca caminar toda la fila de datos uno por uno, así que su esfuerzo crece de forma proporcional al tamaño del negocio.





NOV 25-2026 ------------------------------------

DIA 2. SEMANA 1. RETO 6



Paso 2 - 

Traza con 5 ventas (n = 5):Para entender por qué se traba el programa, quise hacer la prueba con poquitas ventas y contar a mano cuántas veces choca una con otra. Imaginé que tenemos 5 recibos en la mesa: El primer recibo lo comparo contra los otros 4 de adelante (4 choques).El segundo recibo lo comparo contra los 3 que le quedan (3 choques).El tercero contra los 2 restantes (2 choques).El cuarto contra el último (1 choque).Y el último ya no tiene con quién compararse (0 choques).Al final, sumando todo (4 + 3 + 2 + 1), me di cuenta de que con apenas 5 ventas la computadora ya tuvo que hacer 10 comparaciones.

¿Qué pasa cuando la lista crece?:Si en vez de 5 ventas tenemos miles, el problema no es que aumente un poquito el trabajo; es que por cada nueva venta que entra, se multiplica el desorden. Como un ciclo está metido dentro de otro, la computadora empieza a revisar duplicados una y otra vez de forma innecesaria, creando una cadena gigante de choques que la congela por completo cuando el jefe le pide el reporte anual.



Paso 3 - Medición de tiempos:

Corrí el script en la terminal usando console.time para los tamaños de 1.000, 2.000, 4.000, 8.000 y 16.000 ventas. Al registrar los resultados en la tabla, comprobé lo que predijimos: cuando n se duplica, el tiempo no sube sumando un poquito, sino que se multiplica por cuatro (crecimiento cuadrático). Por eso el sistema se congela cuando la gerente le exige procesar todo el historial de golpe. 



Tamaño de ventas (n) | Tiempo aproximado en consola | Comportamiento del tiempo

1,000 | ~5 a 15 ms | Rápido, casi imperceptible.

2,000 | ~20 a 50 ms | Se cuadruplica respecto al anterior.

4,000 | ~80 a 200 ms | Empieza a notarse la pausa.

8,000 | ~350 a 800 ms | Casi un segundo de espera.

16,000 | ~1.5 a 3.5 segundos | Se siente claramente pesado para el equipo.





Paso 4 - ¿Qué pasa cuando n se duplica y su relación con O(n^2)?:Al mirar la tabla de tiempos, me di cuenta de algo alarmante: cuando duplicamos los datos (por ejemplo, pasar de 8,000 a 16,000), el tiempo no sube sumando un ratito más, ¡sino que se multiplica por cuatro!Esto pasa exactamente porque la función tiene ciclos anidados (O(n^2) o crecimiento cuadrático). Al tener un ciclo dentro de otro, el esfuerzo de la computadora no crece en línea recta, sino que explota al cuadrado cada vez que la base de datos se vuelve más grande.



Paso 5 - Estimación para 100,000 y 1,000,000 de ventas:Usando los tiempos que medimos con 16,000 ventas (que se demoró más o menos unos 3 segundos), hice la proyección matemática para volúmenes reales de empresa:Para 100,000 ventas: Como hay que procesar muchísimos más datos al cuadrado, la estimación me dio alrededor de 2 minutos exactos de espera. para 1,000,000 de ventas (el historial anual completo): Si para 100,000 ya son 2 minutos, al llevarlo a un millón de registros el tiempo se dispara de forma absurda a más de 3 horas continuas de procesamiento para un simple reporte. 



Paso 6 - El costo oculto del .includes():

Además de los ciclos anidados, descubrí que la función tiene un "trabajo invisible": cada vez que encuentra una coincidencia, usa .includes(). Esto obliga a la computadora a recorrer otra vez desde cero la lista de recurrentes para ver si el cliente ya estaba anotado. En el peor de los casos (cuando hay muchas compras repetidas), este esfuerzo extra se acumula y hace que el sistema sufra todavía más.



Paso 7 - Conclusión para el registro del negocio:



"El reporte de clientes recurrentes se vuelve lento porque la forma en que está programado obliga a la computadora a comparar a cada cliente con absolutamente todos los demás de forma cruzada. Con poquitas ventas el equipo ni se inmuta, pero al procesar el historial anual, el número de combinaciones explota y la máquina se pone a hacer millones de cálculos repetidos e innecesarios, lo que hace que el sistema se congele. Para solucionarlo, necesitamos rediseñar la búsqueda para que revise la información de una sola pasada y no ponga a sufrir al procesador."







26 Nov - 2026



reto 7:

La decisión para el motor: Dejaré en el código de producción la Versión de Recorrido Único (totalCiudadUnaPasada).



Justificación: Aunque la cadena de métodos (map, filter, reduce) es estéticamente elegante y muy limpia, el servidor del marketplace opera bajo restricciones de memoria. Evitar la creación de 3 arreglos intermedios y reducir las pasadas de 4 a 1 optimiza de forma directa la presión sobre el recolector de basura de JavaScript. 



Análisis de Rendimiento y Complejidad Espacial (Reto: totalCiudad)



- La prueba de los dos caminos: Estuve probando el enfoque de encadenar métodos (map().filter().map().reduce()) contra un simple ciclo for...of de toda la vida, usando 10,000 ventas generadas. Lo bueno es que ambos caminos llegaron exactamente al mismo número sin fallar.

- ¿Qué pasa por dentro?: 

  - La cadena hace 4 pasadas completas por los datos y se pone a crear 3 arreglos temporales en la RAM (rightarrow O(n) en espacio).

  - El ciclo hace una sola pasada limpia y no crea nada extra en memoria (-> O(1) en espacio auxiliar).

- El enredo del Big O: Aunque la cadena hace n operaciones, por las reglas matemáticas las constantes se vuelven invisibles, así que teóricamente ambas quedan como O(n) en tiempo. Pero ojo, que la teoría no quita que en la práctica los arreglos intermedios pesen y le metan presión a la memoria.

- Repasando el motor: Me puse a mirar las demás funciones: totalPorCiudad y topProductosPorValor arman diccionarios y listas que crecen con los datos (O(n)), mientras que los acumuladores directos se quedan ligeros en memoria constante (O(1)).

- La decisión final: Nos quedamos con el ciclo de una sola pasada (totalCiudadUnaPasada). Aunque la cadena se ve más "elegante" y moderna, hay que cuidar la RAM del servidor del marketplace para que no sufra cuando le caigan muchas transacciones de golpe.

Noviembre 26 - 2026: Cierre de v0.2

Feedback del combo: Estuve revisando el informe con un compañero del parche de desarrollo y me hizo una observación muy válida sobre la función de clientesRecurrentes. Me comentó que, aunque el código original se entiende leyéndolo por encima, dejar un proceso O(n^2) en producción es arriesgarse demasiado a que el servidor se caiga apenas el cliente cargue el historial completo del año. Le dije que tiene toda la razón, y por eso en el archivo RENDIMIENTO.md ya dejamos planteado el plan para migrarlo a un Set de una sola pasada en la siguiente iteración.



Preparando la entrega: Ya dejamos todo bien documentado en el archivo de rendimiento, validamos que todas las métricas cuadren correctamente y armamos los commits correspondientes a cada mini-reto para dejar el repositorio impecable con la etiqueta v0.2.


Noviembre 26--2026

Aplicamos el método de resolución de retos para limpiar el cuello de botella principal del sistema:

1. Entender el Problema

Entradas: Un arreglo gigante de objetos de ventas (ventas), donde cada objeto contiene el identificador de un cliente.

Salidas: Una lista (arreglo) única con los códigos de los clientes que aparecen más de una vez en las transacciones.

Restricciones: El marketplace exige que el reporte responda en menos de 1 segundo incluso al procesar 100,000 ventas, ya que la versión anterior de ciclos anidados se quedaba completamente congelada.

2. Ejemplos y Casos Borde

Si la lista de ventas está vacía, la función debe retornar un arreglo vacío [].

Si ningún cliente se repite en el historial, debe retornar [].

Si un mismo cliente aparece 5 veces, solo debe listarse una única vez en el resultado final para evitar duplicados.

3. Fuerza Bruta y su Complejidad

Enfoque original: Dos ciclos for anidados cruzando cada venta contra todas las demás, acompañados de una búsqueda con .includes().

Complejidad Temporal: O(n^2) (Cuadrática). Al llegar a 100,000 ventas, el número de operaciones se dispara a miles de millones, volviéndose totalmente inviable.

4. Idea de Optimización

En lugar de hacer comparaciones cruzadas, logramos resolverlo en una sola pasada lineal O(n) mediante dos alternativas:

Opción A (Set): Usamos un Set llamado vistos para ir registrando los clientes que ya pasaron, y otro Set llamado recurrentes para capturar al instante a los repetidos apenas los volvemos a encontrar.

Opción B (Map): Usamos un Map para llevar el conteo exacto de compras por cada cliente (cliente -> cantidad), y al final simplemente filtramos los que pasaron de 1 compra.

5. Implementación

Codificamos con éxito tanto clientesRecurrentesSet como comprasPorCliente, y validamos que al ordenar las respuestas con .sort(), las tres versiones (original, Set y Map) coinciden milimétricamente en los datos entregados.

6. Pruebas, Mediciones y el Intercambio de Memoria (Time-Space Tradeoff)

Resultados comparativos según el tamaño de ventas (n):

Para 1,000 ventas:

Versión Original O(n^2): ~10 ms

Versión Set O(n): ~1 ms

Versión Map O(n): ~2 ms

Para 10,000 ventas:

Versión Original O(n^2): ~800 ms

Versión Set O(n): ~3 ms

Versión Map O(n): ~4 ms

Para 100,000 ventas:

Versión Original O(n^2): Congelado / Inviable

Versión Set O(n): ~15 - 25 ms

Versión Map O(n): ~20 - 35 ms

El intercambio (Tradeoff): ¿Qué ganamos y qué perdimos? Ganamos tiempo de una forma brutal, bajando de minutos u horas a apenas unos milisegundos y cumpliendo sobrados con la meta de 1 segundo para 100,000 registros. ¿El costo? Memoria, específicamente O(n) en espacio auxiliar, ya que necesitamos crear el Set o el Map en la RAM para guardar los registros únicos o los conteos. Como la memoria RAM del servidor es mucho más barata y tolerante que el tiempo de espera del usuario, este intercambio vale totalmente la pena.

