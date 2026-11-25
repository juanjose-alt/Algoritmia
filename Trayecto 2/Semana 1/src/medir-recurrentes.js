// Traemos la fábrica de ventas que armamos en el MiniReto 5
const { generarVentas } = require('./generador.js');

// La función con los dos ciclos anidados
function clientesRecurrentes(ventas) {
  const recurrentes = [];
  
  // Recorremos la lista desde el inicio
  for (let i = 0; i < ventas.length; i++) {
    // Y aquí adentro volvemos a recorrer la lista desde la siguiente posición
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente &&
          !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

// Las tandas de datos que vamos a probar (cada una es el doble de la anterior)
const tamanios = [1000, 2000, 4000, 8000, 16000];

console.log("INICIANDO LAS PRUEBAS DE RENDIMIENTO");

// Le damos una vuelta a cada tamaño para ver cómo se porta el procesador
for (let n of tamanios) {
  // Creamos la lista falsa de ventas con el tamaño que toque
  const datos = generarVentas(n);

  // Prendemos el cronómetro
  console.time(`n = ${n}`);

  // Ponemos a trabajar a la función pesada
  clientesRecurrentes(datos);

  // Apagamos el cronómetro y miramos cuánto se demoró
  console.timeEnd(`n = ${n}`);
}