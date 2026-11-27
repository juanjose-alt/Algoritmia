const ventasBase = require('./datos.js');
const catalogo = require('./catalogo.js');
const { generarVentas } = require('./generador.js');
const {
    totalVendidoM,
    unidadesVendidasM,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    clientesRecurrentesSet,
    productoEstrellaPorCiudad,
    comboRegalo,
    primerClienteUnico,
    mejorSemana
} = require('./analitica.js');

// Verificamos si el usuario pasó un argumento por consola (ej. node src/reporte.js 100000)
const args = process.argv.slice(2);
let ventas;
let modoEjecucion;

if (args.length > 0 && !isNaN(parseInt(args[0]))) {
    const n = parseInt(args[0]);
    console.log(`⚙️ Generando lote de prueba con ${n.toLocaleString("es-CO")} ventas...`);
    ventas = generarVentas(n);
    modoEjecucion = `Datos Generados (${n.toLocaleString("es-CO")} registros)`;
} else {
    ventas = ventasBase;
    modoEjecucion = "Datos Base del Día 1 (12 registros oficiales)";
}

console.log("==================================================");
console.log("   REPORTE GENERAL DE ANALÍTICA - CAFÉ ORIGEN     ");
console.log(`   Modo: ${modoEjecucion}`);
console.log("==================================================\n");

// 1. Resumen General
console.log("[ RESUMEN GENERAL ]");
console.log(`• Total Vendido:    $${totalVendidoM(ventas).toLocaleString("es-CO")}`);
console.log(`• Unidades Totales: ${unidadesVendidasM(ventas).toLocaleString("es-CO")}`);
console.log(`• Ticket Promedio:  $${ticketPromedio(ventas).toLocaleString("es-CO", {maximumFractionDigits: 2})}`);
console.log("");

// 2. Ventas por Ciudad
console.log("[ VENTAS POR CIUDAD ]");
const porCiudad = totalPorCiudad(ventas);
for (let [ciudad, valor] of Object.entries(porCiudad)) {
    console.log(`• ${ciudad}: $${valor.toLocaleString("es-CO")}`);
}
console.log("");

// 3. Unidades por Producto
console.log("[ UNIDADES POR PRODUCTO ]");
const porProd = unidadesPorProducto(ventas);
for (let [prod, unidades] of Object.entries(porProd)) {
    console.log(`• ${prod}: ${unidades} unidades`);
}
console.log("");

// 4. Top 3 Productos por Valor
console.log("[ TOP 3 PRODUCTOS POR VALOR ]");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((item, index) => {
    console.log(`${index + 1}. ${item.producto} — $${item.valor.toLocaleString("es-CO")}`);
});
console.log("");

// 5. Análisis de Fechas
console.log("[ ANÁLISIS DE FECHAS ]");
const diaConVentas = ventas[0] ? ventas[0].fecha : "2026-11-01";
const diaSinVentas = "2030-01-01";

console.log(`> Día con ventas (${diaConVentas}):`);
console.log(ventasDelDia(ventas, diaConVentas));

console.log(`> Día sin ventas (${diaSinVentas}):`);
console.log(ventasDelDia(ventas, diaSinVentas));
console.log("");

// ==========================================================
// NUEVAS SECCIONES OPTIMIZADAS (CAMPAÑA Y RENDIMIENTO)
// ==========================================================

// 6. Clientes Recurrentes (Usando Set optimizado O(n))
console.log("[ CLIENTES RECURRENTES ]");
const recurrentes = clientesRecurrentesSet(ventas);
console.log(`• Clientes que han comprado más de una vez (${recurrentes.length}):`, recurrentes.join(", "));
console.log("");

// 7. Producto Estrella por Ciudad
console.log("[ PRODUCTO ESTRELLA POR CIUDAD ]");
const estrellas = productoEstrellaPorCiudad(ventas);
for (let [ciudad, info] of Object.entries(estrellas)) {
    console.log(`• ${ciudad}: ${info.producto} (${info.apariciones} ventas)`);
}
console.log("");

// 8. Combo de Regalo Sugerido ($87.000)
console.log("[ COMBO DE REGALO SUGERIDO ($87.000) ]");
const presupuestoCombo = 87000;
const combo = comboRegalo(catalogo, presupuestoCombo);
if (combo) {
    console.log(`• Sugerencia: "${combo[0].producto}" ($${combo[0].precio.toLocaleString("es-CO")}) + "${combo[1].producto}" ($${combo[1].precio.toLocaleString("es-CO")})`);
} else {
    console.log("• No se encontró una combinación exacta para este valor.");
}
console.log("");

// 9. Primer Cliente Único (Para enviar cupón de regreso)
console.log("[ CLIENTE PARA CUPÓN DE REGRESO ]");
const clienteCupon = primerClienteUnico(ventas);
console.log(`• Primer cliente con una sola compra en el historial: ${clienteCupon ? clienteCupon : "Ninguno"}`);
console.log("");

// 10. Mejor Semana de Ventas (Ventana Deslizante k=7)
console.log("[ MEJOR SEMANA DE VENTAS (7 DÍAS CONSECUTIVOS) ]");
const ventasDiariasSeptiembre = [320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
                                 480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
                                 710, 380, 360, 440, 500, 590, 650, 720, 400, 370];
const mejor = mejorSemana(ventasDiariasSeptiembre, 7);
if (mejor) {
    console.log(`• Inicia en el Día ${mejor.mejorInicio} del mes con un total acumulado de $${mejor.maxSuma.toLocaleString("es-CO")} (en miles).`);
}
