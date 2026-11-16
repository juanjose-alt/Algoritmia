# Programa que dibuja una pirámide de asteriscos con la altura que elija el usuario

# Pedimos la altura. 
n = int(input("Altura de la pirámide: "))

# Este ciclo recorre cada fila de la pirámide, de la 1 hasta la n.
# range(1, n + 1) llega hasta n porque el último número NO se incluye,
# por eso sumamos 1.
for fila in range(1, n + 1):

    # Primero van los espacios de la izquierda, que empujan los asteriscos
    # hacia el centro. En la fila 1 hacen falta n-1 espacios, y van
    # bajando de uno en uno hasta llegar a 0 en la última fila.
    # end="" evita que print salte de línea, así todo queda en la misma
    # fila
    for j in range(1, n - fila + 1):
        print(" ", end="")

    # Luego van los asteriscos. Cada fila tiene 2 * fila - 1: la primera
    # tiene 1, la segunda 3, la tercera 5... así la pirámide crece
    # dos asteriscos por fila, uno a cada lado.
    for j in range(1, 2 * fila):
        print("*", end="")

    # Al terminar la fila, un print vacío da el salto de línea
    # para pasar a la siguiente.
    print()