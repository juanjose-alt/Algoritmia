# Programa para calcular la edad en días

# Pedimos la edad. input() siempre nos devuelve texto, así que usamos int()
# para volverlo un número entero.
edad = int(input("Digite su edad: "))

# Multiplicamos la edad por 365, que son los días de un año.
dias = 365 * edad

print(f"Su edad en días es: {dias}")