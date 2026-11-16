# Algoritmo de registro: revisa la edad mínima y la aceptación de términos

# Pedimos la edad.
edad = int(input("Escribe tu edad: "))

# Los términos los dejamos como texto. Con upper() los pasamos a mayúsculas,
# así da lo mismo si la persona escribe "s" o "S", "n" o "N".
terminos = input("¿Acepta los términos y condiciones? (S/N): ")
terminos = terminos.upper()

# Primera revisión: la respuesta de los términos solo puede ser S o N.
# Si es cualquier otra cosa, avisamos del error y no seguimos revisando.
if terminos != "S" and terminos != "N":
    print("Error: Ingrese un carácter válido para los términos y condiciones (S/N)")

# Segunda revisión: si es menor de 14, no puede registrarse, haya aceptado
# los términos o no. (La parte de "terminos == S or terminos == N" siempre
# se cumple aquí, porque la primera revisión ya descartó otras letras.)
elif edad < 14 and (terminos == "S" or terminos == "N"):
    print("Debes tener al menos 14 años para registrarte")

# Tercera revisión: tiene 14 o más y aceptó los términos, entonces
# el registro es exitoso.
elif edad >= 14 and terminos == "S":
    print("Registro exitoso")

# Si llegamos aquí, la persona tiene 14 o más pero respondió "N",
# o sea que no aceptó los términos.
else:
    print("Debe aceptar los términos y condiciones para registrarse")