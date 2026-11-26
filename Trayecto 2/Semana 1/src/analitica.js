const ventas = require("./datos");

function valorVenta(venta) {
    let total = 0;
    total = venta.cantidad * venta.precio;
    return total; 
}

// --- 1. Versiones con Ciclos (Para verificar.js) ---
function totalVendido(ventas) {
    let acumulador = 0;
    for (let venta of ventas) {
        acumulador += valorVenta(venta);
    }
    return acumulador;
}

function unidadesVendidas(ventas) {
    let acumuladorUnidades = 0; 
    for (let venta of ventas) {
        acumuladorUnidades += venta.cantidad; 
    }
    return acumuladorUnidades;
}

function ventasPorCiudad(ventas, ciudad) {
    let acumuladorCiudad = 0;
    let ciudadLimpia = ciudad.trim().toLowerCase(); 
    for (let venta of ventas) {
        let ciudadVenta = venta.ciudad.trim().toLowerCase(); 
        if (ciudadVenta === ciudadLimpia){
            acumuladorCiudad += valorVenta(venta);
        }
    }
    return acumuladorCiudad;
}

// --- 2. Versiones con Métodos de Arreglo (Reto 3) ---
function totalVendidoM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
    return ventas.reduce((acumulador, venta) => acumulador + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
    let ciudadLimpia = ciudad.trim().toLowerCase();
    return ventas
        .filter(venta => venta.ciudad.trim().toLowerCase() === ciudadLimpia)
        .reduce((acumulador, venta) => acumulador + valorVenta(venta), 0);
}

// --- Funciones de Apoyo y Reto 2 ---
function ventaMayor(ventas) {
    if (ventas.length === 0) {
        return null;
    }
    let mayor = ventas[0]; 
    for (let venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta; 
        }
    }
    return mayor; 
}

function ticketPromedio(ventas) {
    if (ventas.length === 0) {
        return 0;
    }
    let contadorValidas = 0; 
    for (let venta of ventas) {
        if (venta.cantidad > 0) {
            contadorValidas += 1; 
        }
    }
    if (contadorValidas === 0) {
        return 0;
    }
    return totalVendidoM(ventas) / contadorValidas; 
}

// --- 3. Agrupaciones y Rankings (Reto 3) ---
function totalPorCiudad(ventas) {
    let resultado = {};
    for (let venta of ventas) {
        let ciudad = venta.ciudad.trim();
        if (!resultado[ciudad]) {
            resultado[ciudad] = 0;
        }
        resultado[ciudad] += valorVenta(venta);
    }
    return resultado;
}

function unidadesPorProducto(ventas) {
    let resultado = {};
    for (let venta of ventas) {
        let prod = venta.producto;
        if (!resultado[prod]) {
            resultado[prod] = 0;
        }
        resultado[prod] += venta.cantidad;
    }
    return resultado;
}

function topProductosPorValor(ventas, k) {
    let totales = {};
    for (let venta of ventas) {
        let prod = venta.producto;
        if (!totales[prod]) {
            totales[prod] = 0;
        }
        totales[prod] += valorVenta(venta);
    }

    let lista = Object.entries(totales).map(([producto, valor]) => {
        return { producto, valor };
    });

    return [...lista]
        .sort((a, b) => b.valor - a.valor)
        .slice(0, k);
}

function ventasDelDia (ventas, fecha) {
    let fechaLimpia = fecha.trim();
    let ventasDia = ventas.filter(v => v.fecha.trim() === fechaLimpia);
    
    if (ventasDia.length === 0) {
        return {
            totalVendido: 0,
            unidadesVendidas: 0,
            mensaje: "No se registraron ventas en esta fecha."
        };
    }
    
    return {
        totalVendido: totalVendidoM(ventasDia),
        unidadesVendidas: unidadesVendidasM(ventasDia),
        transacciones: ventasDia.length
    };
}


/* Reto 7, dia 2 

// --- Versión A: Cadena de Métodos (Encadenamiento) ---
function totalCiudadCadena(ventas, ciudad) {
    let ciudadLimpia = ciudad.trim().toLowerCase();
    return ventas
        .map(v => ({ ...v, ciudad: v.ciudad.trim().toLowerCase() })) // 1er mapeo: normaliza ciudad
        .filter(v => v.ciudad === ciudadLimpia)                       // 2do filtrado: selecciona la ciudad
        .map(v => valorVenta(v))                                      // 3er mapeo: calcula el valor total de cada venta
        .reduce((acum, val) => acum + val, 0);                        // Reducción: suma acumulada
}

*/

function totalCiudadUnaPasada(ventas, ciudad) {
    let ciudadLimpia = ciudad.trim().toLowerCase();
    let acumulador = 0;
    for (let venta of ventas) {
        if (venta.ciudad.trim().toLowerCase() === ciudadLimpia) {
            acumulador += valorVenta(venta);
        }
    }
    return acumulador;
}


// --- Exportaciones ---
module.exports = {
    valorVenta,
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    totalCiudadUnaPasada
};