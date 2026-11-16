# Programa para calcular una cuenta con IVA y propina, y lo que paga cada persona

# Pedimos el valor de la cuenta. input() 
subtotal = int(input("Escriba el valor de la cuenta: "))

propina = 10

personas = int(input("Escriba la cantidad de personas: "))

# Valor de la propina: el 10% del subtotal. Dividimos el porcentaje entre 100
# para volverlo fracción (10 -> 0.10) y lo multiplicamos por la cuenta.
valor_propina = subtotal * (propina / 100)

# El IVA es del 19%, o sea 19/100 = 0.19, y se calcula sobre el subtotal
iva = 19 / 100
valor_iva = subtotal * iva

# Total sin propina: solo el subtotal más el IVA
total_sin_propina = subtotal + valor_iva

# Total con propina: subtotal, más el IVA, más la propina
total = subtotal + valor_iva + valor_propina

# Cuánto le toca a cada uno repartiendo el total entre todas las personas,
# primero con propina y luego sin ella
pago_persona = total / personas
pago_persona_sin_propina = total_sin_propina / personas

print(f"La propina es: {valor_propina:.2f}")
print(f"El subtotal más el IVA y la propina es: {total:.2f}")
print(f"El subtotal más el IVA pero sin la propina es: {total_sin_propina:.2f}")
print(f"El pago por persona, con IVA y *con propina*, es: {pago_persona:.2f}")
print(f"El pago por persona, con IVA y *sin propina*, es: {pago_persona_sin_propina:.2f}")