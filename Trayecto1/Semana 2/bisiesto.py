# Algoritmo que dice si un año es bisiesto o no

year = int(input("Escribe el año que deseas consultar: "))

# Un año es bisiesto si cumple una de estas dos condiciones:
#   1. Es divisible entre 4 Y NO es divisible entre 100 (ej: 2024, 1996)
#   2. Es divisible entre 400 (ej: 2000, 1600)
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print(year, "es bisiesto.")

else:
    print(year, "no es bisiesto.")