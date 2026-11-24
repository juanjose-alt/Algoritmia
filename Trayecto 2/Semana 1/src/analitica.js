const ventas = require("./datos")


function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


function totalVendido(ventas) {
    let acumulador = 0;
    for (let venta of ventas) {
        acumulador += valorVenta(venta) 
    }
    return acumulador 
}



function unidadesVendidas(ventas) {
    let acumuladorUnidades = 0; 

    for (let venta of ventas) {
        acumuladorUnidades += venta.cantidad; 
    }
    return acumuladorUnidades;
}



function ventaMayor (ventas) {
    if (ventas.length === 0) {
        return null 
    }

    let mayor = ventas[0] 
    
    for (let venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta 
        }
    }
    return mayor 
}



function ticketPromedio (ventas) {
    if (ventas.length === 0) {
        return 0;
    }
    let contadorValidas = 0; 
    for (let venta of ventas) {
        if (venta.cantidad > 0) {
            contadorValidas += 1 
        }
    }
    if (contadorValidas === 0) {
        return 0;
    }
    return totalVendido(ventas) / contadorValidas 
}


function ventasPorCiudad (ventas, ciudad) {
    let acumuladorCiudad = 0;
    let ciudadLimpia = ciudad.trim().toLowerCase (); 

    for (let venta of ventas) {
        let ciudadVenta = venta.ciudad.trim().toLowerCase(); 

        if (ciudadVenta === ciudadLimpia){
            acumuladorCiudad += valorVenta(venta);
        }
    }
        return acumuladorCiudad;
}



module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};