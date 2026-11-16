# Programa que valida un PIN con máximo 3 intentos

# El PIN va entre comillas, o sea como TEXTO, y no como número.
# Si lo escribiéramos como número (0987), Python daría error de sintaxis,
# porque no permite ceros a la izquierda en los enteros. Además, un PIN no
# es una cantidad con la que se hagan cuentas, así que texto es lo correcto.
clave_secreta = "0987"

# Llevamos la cuenta de los intentos fallidos, empezando en cero
contador_intentos = 0

# Bandera: False significa "todavía no entra". Pasa a True cuando acierte.
permiso_concedido = False

# El ciclo se repite mientras queden intentos Y todavía no haya permiso.
# Se corta apenas pase una de las dos cosas: acierta o gasta los 3 intentos.
while contador_intentos < 3 and permiso_concedido == False:

    # Pedimos el PIN. La f antes de las comillas deja meter variables entre
    # llaves; aquí mostramos el número de intento (se le suma 1 porque el
    # contador empieza en 0 y a las personas nos suena raro un "intento 0").
    # No usamos int() porque queremos comparar como texto, así "0987" se
    # conserva con su cero inicial.
    clave_capturada = input(f"Ingrese su PIN (Intento {contador_intentos + 1} de 3): ")

    # Doble igual (==) para comparar. Un solo igual sirve para guardar valores.
    if clave_capturada == clave_secreta:
        permiso_concedido = True
        print("¡PIN correcto! Acceso concedido.")
    else:
        # Solo contamos los intentos fallidos. += 1 es lo mismo que
        # contador_intentos = contador_intentos + 1
        contador_intentos += 1

        # Solo avisamos "intente nuevamente" si todavía le quedan intentos.
        # Si ya fue el tercero, no tiene sentido invitarlo a intentar otra vez.
        if contador_intentos < 3:
            print("PIN incorrecto. Intente nuevamente.")

# Al salir del ciclo, si nunca consiguió permiso es porque agotó los intentos
if permiso_concedido == False:
    print("Ha superado los 3 intentos. Sistema bloqueado.")