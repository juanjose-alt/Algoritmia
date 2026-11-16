# Programa para el cajero de un parqueadero: va sumando lo que se cobra a cada
# carro hasta que se escribe 0, y al final muestra cuántos carros se atendieron y cuánto dinero se recaudó.

# Arrancamos con el total y el contador de carros en cero.

total = 0
carros = 0

while True:

    # Pedimos el valor cobrado. 
    valor = float(input("Ingrese el valor cobrado (0 para terminar): "))

    if valor == 0:
        break

    # Si el valor no es 0, es un cobro real: lo sumamos al total y
    # contamos un carro más. += significa "súmale esto a lo que ya tenía".
    total += valor
    carros += 1

print(f"Carros atendidos: {carros}")
print(f"Total recaudado: ${total:.2f}")