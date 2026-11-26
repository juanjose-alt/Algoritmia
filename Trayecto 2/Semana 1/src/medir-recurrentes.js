const { generarVentas } = require('./generador.js');

// ----------------------------------------------------------
// 1. LAS TRES VERSIONES DE LA FUNCIÓN
// ----------------------------------------------------------

// Versión Vieja: Fuerza Bruta con ciclos anidados (O(n^2) - ¡Peligrosa con muchos datos!)
function clientesRecurrentes(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente &&
          !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

// Versión Nueva 1: Usando Set (Búsqueda en O(n) - ¡Súper rápida!)
function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();
  
  for (let venta of ventas) {
    let cliente = venta.cliente.trim();
    if (vistos.has(cliente)) {
      recurrentes.add(cliente);
    } else {
      vistos.add(cliente);
    }
  }
  return Array.from(recurrentes);
}

// Versión Nueva 2: Usando Map (Conteo de frecuencias en O(n) - ¡Igual de veloz!)
function comprasPorCliente(ventas) {
  const conteo = new Map();
  
  for (let venta of ventas) {
    let cliente = venta.cliente.trim();
    let actual = conteo.get(cliente) || 0;
    conteo.set(cliente, actual + 1);
  }
  
  const recurrentes = [];
  for (let [cliente, total] of conteo.entries()) {
    if (total > 1) {
      recurrentes.push(cliente);
    }
  }
  return recurrentes;
}


// ----------------------------------------------------------
// 2. ZONA DE PRUEBAS Y CRONÓMETROS (CONSOLE.TIME)
// ----------------------------------------------------------

// Las tandas de datos que vamos a poner a prueba 
const tamanios = [1000, 10000, 100000];

console.log("=== INICIANDO COMPARATIVA DE RENDIMIENTO PARA RECURRENTES ===");

for (let n of tamanios) {
  // Generamos el lote de ventas falso con el tamaño que toque
  const datos = generarVentas(n);
  console.log(`\n--- Probando con n = ${n} ventas ---`);

  // Ojo: La función original la saltamos si pasa de 10k para evitar que la compu se congele
  if (n <= 10000) {
    console.time(`⏱️ Original O(n^2) [n=${n}]`);
    clientesRecurrentes(datos);
    console.timeEnd(`⏱️ Original O(n^2) [n=${n}]`);
  } else {
    console.log(`⚠️ Original O(n^2) [n=${n}]: Omitido por riesgo de bloqueo (Demasiado lento)`);
  }

  // Medimos la versión con Set
  console.time(`🚀 Set O(n) [n=${n}]`);
  clientesRecurrentesSet(datos);
  console.timeEnd(`🚀 Set O(n) [n=${n}]`);

  // Medimos la versión con Map
  console.time(`⚡ Map O(n) [n=${n}]`);
  comprasPorCliente(datos);
  console.timeEnd(`⚡ Map O(n) [n=${n}]`);
}
