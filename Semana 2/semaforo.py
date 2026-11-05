unidades = int (input("Escribe las unidades: "))

if unidades <0: 
    print ("Error: Unidades no pueden ser negativas")

elif unidades == 0: 
    print ("Rojo: Agotado")

elif unidades <= 10: 
    print ("Amarillo: Pedir")

elif unidades > 10:
    print ("Verde: Disponible")