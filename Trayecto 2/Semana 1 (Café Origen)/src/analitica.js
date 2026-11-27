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



// --- Versión 1: Con Set (Búsqueda y registro en O(n)) ---
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

// --- Versión 2: Con Map (Conteo de frecuencias en O(n)) ---
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




// --- 1. Combo Regalo: Fuerza Bruta O(n^2) ---
function comboRegaloBruta(catalogo, valor) {
    if (!catalogo || catalogo.length < 2) return null;
    
    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null;
}

// --- 2. Combo Regalo Optimizado con Map O(n) ---
function comboRegalo(catalogo, valor) {
    if (!catalogo || catalogo.length < 2) return null;
    
    // Guardamos: precio -> objeto producto
    const vistos = new Map();
    
    for (let item of catalogo) {
        let complemento = valor - item.precio;
        if (vistos.has(complemento)) {
            return [vistos.get(complemento), item];
        }
        vistos.set(item.precio, item);
    }
    return null;
}

// --- 3. Producto Estrella por Ciudad O(n) ---
// Regla de desempate: En caso de empate en cantidad de apariciones, 
// conserva el producto que alcanzó primero ese conteo máximo en orden cronológico.
function productoEstrellaPorCiudad(ventas) {
    if (!ventas || ventas.length === 0) return {};
    
    const conteoPorCiudad = new Map();
    
    // 1. Contamos frecuencias por cada ciudad normalizada
    for (let venta of ventas) {
        let ciudad = venta.ciudad.trim().toLowerCase();
        // Capitalizamos la primera letra para presentar limpio el resultado
        let ciudadFormato = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
        
        if (!conteoPorCiudad.has(ciudadFormato)) {
            conteoPorCiudad.set(ciudadFormato, new Map());
        }
        
        let mapaProductos = conteoPorCiudad.get(ciudadFormato);
        let prod = venta.producto.trim();
        mapaProductos.set(prod, (mapaProductos.get(prod) || 0) + 1);
    }
    
    // 2. Extraemos el producto con mayor frecuencia por ciudad
    const estrellas = {};
    for (let [ciudad, mapaProductos] of conteoPorCiudad.entries()) {
        let mejorProducto = null;
        let maxApariciones = 0;
        
        for (let [producto, cantidad] of mapaProductos.entries()) {
            // Al usar strictly greater (>), en empate se queda el primero que llegó
            if (cantidad > maxApariciones) {
                maxApariciones = cantidad;
                mejorProducto = producto;
            }
        }
        estrellas[ciudad] = { producto: mejorProducto, apariciones: maxApariciones };
    }
    
    return estrellas;
}

// --- 4. Primer Cliente Único O(n) ---
function primerClienteUnico(ventas) {
    if (!ventas || ventas.length === 0) return null;
    
    const frecuencias = new Map();
    
    // Primer recorrido: contar cuántas veces aparece cada cliente
    for (let venta of ventas) {
        let cliente = venta.cliente.trim();
        frecuencias.set(cliente, (frecuencias.get(cliente) || 0) + 1);
    }
    
    // Segundo recorrido: encontrar el primero en orden de ventas con frecuencia === 1
    for (let venta of ventas) {
        let cliente = venta.cliente.trim();
        if (frecuencias.get(cliente) === 1) {
            return cliente;
        }
    }
    
    return null;
}


// --- 1. Mejor Semana: Fuerza Bruta O((n - k + 1) * k) ---
function mejorSemanaBruta(dias, k) {
    if (!dias || dias.length < k || k <= 0) return null;
    let maxSuma = -Infinity;
    let mejorInicio = 0;
    
    for (let i = 0; i <= dias.length - k; i++) {
        let sumaActual = 0;
        for (let j = 0; j < k; j++) {
            sumaActual += dias[i + j];
        }
        if (sumaActual > maxSuma) {
            maxSuma = sumaActual;
            mejorInicio = i;
        }
    }
    return { mejorInicio: mejorInicio + 1, maxSuma }; // Retorna el día de inicio (base 1) y su total
}

// --- 2. Mejor Semana con Ventana Deslizante O(n) ---
function mejorSemana(dias, k) {
    if (!dias || dias.length < k || k <= 0) return null;
    
    // Paso 1: Sumar la primera ventana de tamaño k
    let sumaActual = 0;
    for (let i = 0; i < k; i++) {
        sumaActual += dias[i];
    }
    
    let maxSuma = sumaActual;
    let mejorInicio = 0; // Índice 0 (Día 1)
    
    // Paso 2: Deslizar la ventana elemento por elemento
    for (let i = k; i < dias.length; i++) {
        // Suma el nuevo elemento que entra y resta el que sale por la izquierda
        sumaActual = sumaActual - dias[i - k] + dias[i];
        
        if (sumaActual > maxSuma) {
            maxSuma = sumaActual;
            mejorInicio = i - k + 1; // Índice del nuevo inicio de la ventana
        }
    }
    
    return { mejorInicio: mejorInicio + 1, maxSuma };
}

// --- 3. Par más Cercano con Dos Punteros O(n log n) ---
function parMasCercano(catalogo, presupuesto) {
    if (!catalogo || catalogo.length < 2) return null;
    
    // Paso 1: Ordenar los precios de menor a mayor O(n log n)
    let ordenados = [...catalogo].sort((a, b) => a.precio - b.precio);
    
    let izquierda = 0;
    let derecha = ordenados.length - 1;
    let mejorPar = null;
    let mejorSuma = -1;
    
    // Paso 2: Recorrer con dos punteros desde los extremos O(n)
    while (izquierda < derecha) {
        let suma = ordenados[izquierda].precio + ordenados[derecha].precio;
        
        if (suma <= presupuesto) {
            if (suma > mejorSuma) {
                mejorSuma = suma;
                mejorPar = [ordenados[izquierda], ordenados[derecha]];
            }
            // Como la suma es válida pero queremos acercarnos más al presupuesto, movemos la izquierda hacia arriba
            izquierda++;
        } else {
            // Si nos pasamos del presupuesto, movemos la derecha hacia abajo para bajar la suma
            derecha--;
        }
    }
    
    return mejorPar ? { productos: mejorPar, total: mejorSuma } : null;
}
// --- Exportaciones ---
module.exports = {
    comprasPorCliente,
    clientesRecurrentesSet,
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
    totalCiudadUnaPasada,
    comboRegaloBruta,
    comboRegalo,
    productoEstrellaPorCiudad,
    primerClienteUnico
};