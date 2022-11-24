//Funcion auxiliar para generar la orden
const generateOrderObjects = (nombre, email, telefono, cart, total) => {
    return {
        buyer: {
            nombre: nombre,
            email: email,
            telefono: telefono,
        },
        items: cart,
        total: total,
        createdAt: new Date().toLocaleString()
    }
}

export default generateOrderObjects;