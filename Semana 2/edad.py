edad = int(input("Escribe tu edad: "))
if edad <= 0:
    print("Error: Edad inválida, la edad debe ser mayor a 0")
elif edad > 120:
    print("Error: Edad inválida, la edad no puede ser mayor a 120")

else: 
    print("Edad válida")