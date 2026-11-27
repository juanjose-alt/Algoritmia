const ventas = require('./datos.js');
const { 
    totalVendido, totalVendidoM, 
    unidadesVendidas, unidadesVendidasM, 
    ventasPorCiudad, ventasPorCiudadM 
} = require('./analitica.js');

console.log("=== VERIFICACIÓN DE INDICADORES (CICLO VS MÉTODO) ===");

// 1. Total Vendido
const resCiclo1 = totalVendido(ventas);
const resMetodo1 = totalVendidoM(ventas);
console.log("totalVendido:", resCiclo1 === resMetodo1 ? "OK" : "DIFERENTE");

// 2. Unidades Vendidas
const resCiclo2 = unidadesVendidas(ventas);
const resMetodo2 = unidadesVendidasM(ventas);
console.log("unidadesVendidas:", resCiclo2 === resMetodo2 ? "OK" : "DIFERENTE");

// 3. Ventas por Ciudad (Ej: Medellín)
const resCiclo3 = ventasPorCiudad(ventas, "Medellín");
const resMetodo3 = ventasPorCiudadM(ventas, "Medellín");
console.log("ventasPorCiudad:", resCiclo3 === resMetodo3 ? "OK" : "DIFERENTE");