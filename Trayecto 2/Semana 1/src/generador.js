function generarVentas(n) {
    const productos = [
        { nombre: "Café Sello Rojo", precio: 15000 },
        { nombre: "Café Especial", precio: 25000 },
        { nombre: "Café Gourmet", precio: 35000 }
    ];
    const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];
    let ventas = [];

    for (let i = 1; i <= n; i++) {
        let prod = productos[Math.floor(Math.random() * productos.length)];
        let ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
        let cantidad = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5 unidades
        let clienteId = Math.floor(Math.random() * Math.max(1, Math.floor(n / 3))) + 1;

        ventas.push({
            id: i,
            cliente: `Cliente ${clienteId}`,
            producto: prod.nombre,
            precioUnitario: prod.precio,
            cantidad: cantidad,
            ciudad: ciudad,
            fecha: "2026-11-01"
        });
    }

    return ventas;
}

module.exports = { generarVentas };