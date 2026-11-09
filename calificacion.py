total_suma = 0
cantidad_aprobados = 0
existe_reprobado = False

for indice in range(1, 6):
    calificacion = float(input(f"Ingrese la nota del estudiante {indice} (de 1.0 a 5.0): "))

    total_suma += calificacion

    if calificacion >= 3.0:
        cantidad_aprobados += 1
    else:
        existe_reprobado = True

    if indice == 1:
        calificacion_maxima = calificacion
        calificacion_minima = calificacion
    else:
        if calificacion > calificacion_maxima:
            calificacion_maxima = calificacion
        if calificacion < calificacion_minima:
            calificacion_minima = calificacion

print("--------------------------------------------------")
print(f"PROMEDIO (Acumulador): {total_suma / 5}")
print(f"CANTIDAD QUE APROBARON (Contador): {cantidad_aprobados}")
print(f"NOTA MÁS ALTA (Máximo): {calificacion_maxima}")
print(f"NOTA MÁS BAJA (Mínimo): {calificacion_minima}")

if existe_reprobado:
    print("¿ALGUIEN PERDIÓ? (Bandera): Sí")
else:
    print("¿ALGUIEN PERDIÓ? (Bandera): No")