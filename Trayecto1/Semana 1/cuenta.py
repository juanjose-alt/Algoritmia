# Programa para dividir la cuenta de un restaurante con propina incluida

# Primero pedimos los datos. input() siempre nos devuelve texto,
# así que lo envolvemos en float() para poder hacer cuentas con él.
cuenta = float(input("¿Cuánto fue la cuenta? "))

# Aquí va el porcentaje de propina
porcentaje = float(input("¿Qué porcentaje de propina quieres dejar? "))

personas = int(input("¿Entre cuántas personas se divide? "))

# Sacamos la propina: dividimos el porcentaje entre 100 para volverlo una fracción
# y lo multiplicamos por la cuenta. Por ejemplo, 50000 * 10 / 100 = 5000
propina = cuenta * porcentaje / 100

# Ahora sumamos la propina a la cuenta y repartimos el total entre todos.
por_persona = (cuenta + propina) / personas

# Mostramos el resultado. El :.2f es para que salga con dos decimales.
print(f"Cada uno paga: ${por_persona:.2f}")