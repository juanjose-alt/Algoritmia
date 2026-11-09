altura = int(input("Ingrese la altura de la pirámide: "))

for fila in range(1, altura + 1):
    for espacios in range(1, altura - fila + 1):
        print(" ", end="")

    for asteriscos in range(1, 2 * fila - 1 + 1):
        print("*", end="")

    print()