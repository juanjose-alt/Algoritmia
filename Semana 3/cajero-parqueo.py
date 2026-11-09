acumulado_recaudo = 0
cantidad_vehiculos = 0

monto_pago = int(input("Ingrese el valor del parqueadero (0 para terminar): "))

while monto_pago != 0:
    acumulado_recaudo += monto_pago
    cantidad_vehiculos += 1
    monto_pago = int(input("Ingrese el valor del siguiente carro (0 para terminar): "))

print(f"Total recaudado: ${acumulado_recaudo}")
print(f"Cantidad de carros: {cantidad_vehiculos}")