//Funcion auxiliar para generar la orden
const generateOrderObjects = (nombre, apellido, telefono, email, cart, total) => {
    return {
        buyer: {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email,
        },
        items: cart,
        total: total,
        createdAt: new Date().toLocaleString()
    }
}

export default generateOrderObjects;