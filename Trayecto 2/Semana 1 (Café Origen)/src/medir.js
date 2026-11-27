const { generarVentas } = require('./generador.js');

// 1. Función constante O(1): Siempre hace los mismos pasos sin importar el tamaño
function primeraVenta(ventas, contador) {
    contador.ops++; // Cuenta 1 acceso
    return ventas[0];
}

// 2. Función lineal O(n): Total vendido (recorre toda la lista una vez)
function totalVendido(ventas, contador) {
    let total = 0;
    for (let i = 0; i < ventas.length; i++) {
        contador.ops++; // Cuenta cada vuelta del ciclo
        total += ventas[i].precioUnitario * ventas[i].cantidad;
    }
    return total;
}

// 3. Función lineal O(n): Venta mayor (recorre toda la lista comparando)
function ventaMayor(ventas, contador) {
    let mayor = 0;
    for (let i = 0; i < ventas.length; i++) {
        contador.ops++; // Cuenta la revisión de cada elemento
        let valor = ventas[i].precioUnitario * ventas[i].cantidad;
        if (valor > mayor) {
            mayor = valor;
        }
    }
    return mayor;
}

// 4. Medición para diferentes tamaños de n
const tamanios = [100, 1000, 10000, 100000];
let resultados = [];

for (let n of tamanios) {
    let datos = generarVentas(n);

    // Medir Primera Venta O(1)
    let c1 = { ops: 0 };
    primeraVenta(datos, c1);

    // Medir Total Vendido O(n)
    let c2 = { ops: 0 };
    totalVendido(datos, c2);

    // Medir Venta Mayor O(n)
    let c3 = { ops: 0 };
    ventaMayor(datos, c3);

    resultados.push({
        n: n,
        "primeraVenta O(1)": c1.ops,
        "totalVendido O(n)": c2.ops,
        "ventaMayor O(n)": c3.ops
    });
}

console.log("=== TABLA DE RENDIMIENTO Y OPERACIONES ===");
console.table(resultados);