const ventas = require ("./datos")

const {valorVenta, 
    totalVendido, 
    unidadesVendidas, 
    ventaMayor, 
    ticketPromedio, 
    ventasPorCiudad 
} = require('./analitica.js');

console.log("=== PRUEBAS DE ANALÍTICA - CAFÉ ORIGEN ==="); 

console.log("Total vendido en general:", totalVendido(ventas));
console.log("Unidades totales vendidas:", unidadesVendidas(ventas));
console.log("La venta más alta fue:", ventaMayor(ventas));
console.log("El ticket promedio es:", ticketPromedio(ventas));
console.log("Ventas en la ciudad de Medellín:", ventasPorCiudad(ventas, "Medellín"));