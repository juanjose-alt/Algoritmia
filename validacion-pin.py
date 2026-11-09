clave_secreta = 1234
contador_intentos = 0
permiso_concedido = False

while contador_intentos < 3 and permiso_concedido == False:
    clave_capturada = int(input(f"Ingrese su PIN (Intento {contador_intentos + 1} de 3): "))

    if clave_capturada == clave_secreta:
        permiso_concedido = True
        print("¡PIN correcto! Acceso concedido.")
    else:
        contador_intentos += 1
        if contador_intentos < 3:
            print("PIN incorrecto. Intente nuevamente.")

if permiso_concedido == False:
    print("Ha superado los 3 intentos. Sistema bloqueado.")