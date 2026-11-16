# Programa que arma la factura de un restaurante a partir del subtotal:
# calcula el impuesto (8%), la propina (10%) y el total a pagar.

# Pedimos el subtotal 
subtotal = float(input("Ingrese el subtotal del pedido: "))
impuesto = subtotal * 8 / 100
propina = subtotal * 10 / 100
total = subtotal + impuesto + propina

print("========== FACTURA ==========")
print(f"Subtotal: ${subtotal:.2f}")
print(f"Impuesto (8%): ${impuesto:.2f}")
print(f"Propina (10%): ${propina:.2f}")
print("-----------------------------")
print(f"Total a pagar: ${total:.2f}")