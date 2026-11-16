# Algoritmo que calcula el valor a pagar en un parqueadero

# Pedimos los datos. 
tipo = int(input("Tipo de vehículo (1 = carro, 2 = moto): "))
minutos = int(input("Minutos de permanencia: "))

# La factura la dejamos como texto. Con upper() la pasamos a mayúsculas,
# así da lo mismo si la persona escribe "s" o "S".
factura = input("¿Tiene factura de compra? (S/N): ")
factura = factura.upper()

# Primero revisamos que los minutos tengan sentido: no existe tiempo negativo.
if minutos < 0:
    print("Los minutos no pueden ser negativos.")
else:
    # Según el tipo de vehículo asignamos la tarifa por hora.
    # Si el tipo no es 1 ni 2, la tarifa queda en 0 y la usamos como señal
    # de que el tipo no es válido.
    if tipo == 1:
        tarifa = 4000
    elif tipo == 2:
        tarifa = 2000
    else:
        tarifa = 0

    if tarifa == 0:
        print("Tipo de vehículo no válido")
    else:
        # Los primeros 15 minutos son gratis
        if minutos <= 15:
            total = 0
        else:
            # Aquí se cobra por hora o fracción: cualquier fragmento de hora
            # cuenta como hora completa. La fórmula (minutos + 59) // 60 es un
            # truco para redondear hacia arriba. El // es la división entera,
            # que descarta los decimales.
            # Ejemplo: 61 minutos -> (61 + 59) // 60 = 2 horas
            horas = (minutos + 59) // 60
            total = horas * tarifa

            # El cobro máximo es $30.000, sin importar cuántas horas sean
            if total > 30000:
                total = 30000

            # Si trae factura de compra, se le da 50% de descuento.
            # Ojo: el descuento se aplica después del tope, y solo cuando
            # pasó los 15 minutos gratis.
            if factura == "S":
                total = total / 2

        print("El valor a pagar es: $", total)