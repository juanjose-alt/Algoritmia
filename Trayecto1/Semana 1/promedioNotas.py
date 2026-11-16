# Programa para calcular el promedio de tres calificaciones

# Pedimos las tres notas una por una. input() siempre nos devuelve texto,
# así que usamos float() para convertirlo en número y poder sumarlo después.

calificacion_a = float(input("Ingrese la primera calificación: "))
calificacion_b = float(input("Ingrese la segunda calificación: "))
calificacion_c = float(input("Ingrese la tercera calificación: "))

# Sumamos las tres notas y dividimos entre 3. 
promedio = (calificacion_a + calificacion_b + calificacion_c) / 3

# Mostramos el resultado. La f antes de las comillas nos deja meter la variable
# dentro del texto con llaves, y :.2f lo redondea a dos decimales.
print(f"El promedio de las tres notas es: {promedio:.2f}")