const ventas = require('./datos.js');
const {
    totalVendidoM,
    unidadesVendidasM,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require('./analitica.js');

// 1. Resumen General
console.log("[ RESUMEN GENERAL ]");
console.log(`• Total Vendido:    $${totalVendidoM(ventas).toLocaleString("es-CO")}`);
console.log(`• Unidades Totales: ${unidadesVendidasM(ventas).toLocaleString("es-CO")}`);
console.log(`• Ticket Promedio:  $${ticketPromedio(ventas).toLocaleString("es-CO", {maximumFractionDigits: 2})}`);

// 2. Ventas por Ciudad
console.log(" [ VENTAS POR CIUDAD ]");
const porCiudad = totalPorCiudad(ventas);
for (let [ciudad, valor] of Object.entries(porCiudad)) {
    console.log(`• ${ciudad}: $${valor.toLocaleString("es-CO")}`);
}

// 3. Unidades por Producto
console.log("[ UNIDADES POR PRODUCTO ]");
const porProd = unidadesPorProducto(ventas);
for (let [prod, unidades] of Object.entries(porProd)) {
    console.log(`• ${prod}: ${unidades} unidades`);
}

// 4. Top 3 Productos por Valor
console.log("[ TOP 3 PRODUCTOS POR VALOR ]");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((item, index) => {
    console.log(`${index + 1}. ${item.producto} — $${item.valor.toLocaleString("es-CO")}`);
});

// 5. Pruebas de días (con ventas vs sin ventas)
console.log("[ ANÁLISIS DE FECHAS ]");
const diaConVentas = ventas[0] ? ventas[0].fecha : "2026-11-01";
const diaSinVentas = "2030-01-01";

console.log(`> Día con ventas (${diaConVentas}):`);
console.log(ventasDelDia(ventas, diaConVentas));

console.log(`> Día sin ventas (${diaSinVentas}):`);
console.log(ventasDelDia(ventas, diaSinVentas));


// --------------------------------------------------

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
