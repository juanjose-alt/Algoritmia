tipo = int(input("Tipo de vehículo (1 = carro, 2 = moto): "))
minutos = int(input("Minutos de permanencia: "))
factura = input("¿Tiene factura de compra? (S/N): ")
factura = factura.upper()

if minutos < 0:
    print("Los minutos no pueden ser negativos.")
else:
    if tipo == 1:
        tarifa = 4000
    elif tipo == 2:
        tarifa = 2000
    else:
        tarifa = 0

    if tarifa == 0:
        print("Tipo de vehículo no válido")
    else:
        if minutos <= 15:
            total = 0
        else:
            horas = (minutos + 59) // 60
            total = horas * tarifa
            if total > 30000:
                total = 30000
            if factura == "S":
                total = total / 2
        print("El valor a pagar es: $", total)

        