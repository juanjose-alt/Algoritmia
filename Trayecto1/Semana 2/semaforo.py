# Algoritmo que muestra el estado del inventario según las unidades disponibles
# (funciona como un semáforo: rojo, amarillo y verde)

# Pedimos las unidades.
unidades = int(input("Escribe las unidades: "))

# Primera revisión: no puede haber unidades negativas.
if unidades < 0:
    print("Error: Unidades no pueden ser negativas")

# Segunda revisión: si no queda nada, está agotado (rojo).
elif unidades == 0:
    print("Rojo: Agotado")

# Tercera revisión: llegamos aquí solo si hay 1 o más unidades.
# Entre 1 y 10 quedan pocas, así que toca pedir más (amarillo).
# El <= incluye al 10, o sea que con exactamente 10 todavía es amarillo.
elif unidades <= 10:
    print("Amarillo: Pedir")

# Cuarta revisión: más de 10 unidades significa que hay suficiente (verde).
# Ojo: aquí el elif podría ser un else, porque si llegó hasta este punto,
# ya se sabe que son más de 10. Funciona igual de las dos formas.
elif unidades > 10:
    print("Verde: Disponible")