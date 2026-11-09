def capturar_consumo():
    total_cuenta = 0

    costo_plato = float(input("Ingrese el precio del plato (0 para terminar): "))

    while costo_plato != 0:
        cantidad_platos = float(input("Ingrese la cantidad: "))

        total_cuenta += costo_plato * cantidad_platos

        costo_plato = float(input("Ingrese el siguiente precio del plato (0 para terminar): "))

    return total_cuenta


def obtener_porcentaje(monto, porcentaje):
    return monto * porcentaje / 100


def desplegar_factura(monto_subtotal, tasa_impuesto, monto_propina):
    print("--------------------------------------------------")
    print(f"Subtotal: ${monto_subtotal}")
    print(f"Impuesto (8%): ${tasa_impuesto}")
    print(f"Propina (10%): ${monto_propina}")
    print(f"Total a pagar: ${monto_subtotal + tasa_impuesto + monto_propina}")


monto_subtotal = capturar_consumo()
tasa_impuesto = obtener_porcentaje(monto_subtotal, 8)
monto_propina = obtener_porcentaje(monto_subtotal, 10)

desplegar_factura(monto_subtotal, tasa_impuesto, monto_propina)