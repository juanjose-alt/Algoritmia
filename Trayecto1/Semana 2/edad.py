# Algoritmo que revisa si una edad es válida (entre 1 y 120 años)

edad = int(input("Escribe tu edad: "))

# Primera revisión: si la edad es 0 o negativa, no tiene sentido.
# El <= significa "menor o igual que", por eso el 0 también se rechaza.
if edad <= 0:
    print("Error: Edad inválida, la edad debe ser mayor a 0")

# Segunda revisión: solo se llega aquí si la edad NO fue 0 o negativa.
# Ponemos 120 como límite razonable de una vida humana.
elif edad > 120:
    print("Error: Edad inválida, la edad no puede ser mayor a 120")

# Si no se cumplió ninguna de las dos anteriores, la edad está entre
# 1 y 120, así que es válida.
else:
    print("Edad válida")