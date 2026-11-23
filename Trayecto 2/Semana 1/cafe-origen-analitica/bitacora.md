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