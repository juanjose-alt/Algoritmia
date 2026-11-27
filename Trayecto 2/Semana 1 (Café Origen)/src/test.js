const ventas = require("./datos");

const {
    valorVenta, 
    totalVendidoM, 
    unidadesVendidasM, 
    ventaMayor, 
    ticketPromedio, 
    ventasPorCiudadM 
} = require('./analitica.js');

console.log("=== PRUEBAS DE ANALÍTICA - CAFÉ ORIGEN ==="); 

console.log("Total vendido en general:", totalVendidoM(ventas));
console.log("Unidades totales vendidas:", unidadesVendidasM(ventas));
console.log("La venta más alta fue:", ventaMayor(ventas));
console.log("El ticket promedio es:", ticketPromedio(ventas));
console.log("Ventas en la ciudad de Medellín:", ventasPorCiudadM(ventas, "Medellín"));