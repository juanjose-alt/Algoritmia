Noviembre 23/2026

# Bitácora - Reto 1: Café Origen

arranqué con este reto. Estuve revisando los datos antes de tirar código o fórmulas, porque como dice el líder técnico, si los datos vienen mal desde el inicio, todo lo demás sale mal. Aquí dejo mis apuntes de lo que encontré.

## Diccionario de datos

- id: el número de cada venta, va del 1 al 12 en orden cronológico.
- fecha: el día en que se hizo la compra (primeros días de septiembre de 2026).
- cliente: el código del cliente (como C01, C02). Ojo, vi que un mismo cliente se puede repetir.
- producto: el artículo que compraron (café de Huila, Nariño, Sierra, prensa francesa o molino).
- ciudad: de dónde es el pedido (Bogotá, Medellín, Cali, Pereira).
- cantidad: cuántas unidades se llevaron en esa compra.
- precio: cuánto cuesta una unidad de ese producto en pesos.

## Casos borde detectados

- El "medellín" con minúscula en el registro 5: en casi todos dice "Medellín" con mayúscula. Para JavaScript eso cuenta como cosas distintas, así que tengo que unificarlo en la limpieza.
- La cantidad 0 en el registro 8: el cliente C06 compró en Cali pero la cantidad es cero. ¿Fue un error al escribir el reporte o una venta cancelada? Hay que tener cuidado con esto al calcular totales de unidades o ingresos.
- Clientes repetidos en fechas distintas: al principio pensé que cada cliente salía una sola vez en todo el archivo, pero el C01 aparece varias veces. Esto es un historial de transacciones, no una lista de usuarios únicos.



Nov 23-2026 

** Pseudocodigo de cada indicador(pseint): **

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