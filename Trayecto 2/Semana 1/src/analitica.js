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







module.exports = {
    valorVenta,
    totalVendido
}