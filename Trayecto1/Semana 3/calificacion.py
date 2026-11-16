# Programa que analiza las notas de 5 estudiantes: calcula el promedio,
# cuántos aprobaron, la nota más alta y la más baja, y avisa si alguien perdió.

# Empezamos con los contadores en cero.
suma = 0
aprobados = 0

# Esta variable funciona como una bandera: arranca en False ("nadie ha
# perdido") y la cambiamos a True si aparece alguien con nota menor a 3.
perdio = False

# range(1, 6) va de 1 a 5. 
for i in range(1, 6):

    # Pedimos la nota del estudiante.
    nota = float(input(f"Ingrese la nota del estudiante {i}: "))

    # Vamos acumulando la suma para sacar el promedio al final
    suma = suma + nota

    # Con la primera nota no hay con qué comparar, así que la tomamos como
    # la mayor y la menor al mismo tiempo.
    if i == 1:
        mayor = nota
        menor = nota
    else:
        # Desde la segunda nota en adelante, comparamos con las que ya
        # tenemos guardadas. Si la nueva es más alta, reemplaza a la mayor...
        if nota > mayor:
            mayor = nota

        # ...y si es más baja, reemplaza a la menor.
        if nota < menor:
            menor = nota

    # Se aprueba con 3 o más. Si aprobó, sumamos uno al contador.
    if nota >= 3:
        aprobados = aprobados + 1
    else:
        # Si no aprobó, encendemos la bandera. Una vez en True ya no vuelve
        # a False, así que al final sabremos que al menos uno perdió.
        perdio = True

# Con el ciclo terminado, sacamos el promedio: la suma entre 5 estudiantes
promedio = suma / 5

# Mostramos los resultados. La f antes de las comillas nos deja meter
# variables dentro del texto con llaves, y :.2f muestra el promedio con
# dos decimales para que no salgan colas largas de números.
print(f"PROMEDIO: {promedio:.2f}")
print(f"ESTUDIANTES APROBADOS: {aprobados}")
print(f"NOTA MAS ALTA: {mayor}")
print(f"NOTA MAS BAJA: {menor}")

# Como perdio ya es True o False, no hace falta compararlo con "== True":
# el if puede usarlo directamente.
if perdio:
    print("Alguien perdio la materia")
else:
    print("Todos aprobaron la materia")

print("==========================")