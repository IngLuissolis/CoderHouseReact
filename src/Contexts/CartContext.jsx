import React, { createContext, useState } from 'react';

export const Shop = createContext({});

const ShopProvider = ({children}) => {

    const [productsCart, setProductsCart] = useState([]);

    const addProduct = (productToAdd) => {

        const flagRepetead = isInCart(productToAdd.id);

        if (flagRepetead) {
            //Lógica para agregar la cantidad y no agregar el producto entero
            //1ero encontramos el producto repetido y le adicionamos la cantidad correspondiente
            const productoRepetidoModificado = productsCart.find(
                (productInCart) => productInCart.id === productToAdd.id
            );
            productoRepetidoModificado.cantidad += productToAdd.cantidad;
            productoRepetidoModificado.precioParcial += productToAdd.precioParcial;
            //2do quitamos el producto repetido del carrito y colocamos el producto repetido pero modificado
            const productosCartSinRepetido = productsCart.filter(
                (productsInCart) => productsInCart.id !== productToAdd.id
            );
            setProductsCart([
                ...productosCartSinRepetido,
                productoRepetidoModificado,
            ]);
            
        } else {
            setProductsCart([...productsCart, productToAdd]);
        }

    }

    //Equivalente a isInCart
    const isInCart = (id) => {
        return productsCart.some(product => product.id === id);
    }

    //Eliminar un producto
    const removeProduct = (id) => {
        const productosCart = productsCart.filter(productsInCart => productsInCart.id !== id);
        setProductsCart(productosCart);
    }

    //Vaciar el carrito
    const emptyCart = () => {
        setProductsCart([])
    }

    //Cálculo del precio total
    const calculoTotal = () => {
        const total = productsCart.reduce((acumulador, productoActual) => 
        acumulador += productoActual.cantidad * productoActual.precio, 0);
        return total;
    }

    //Cálculo del total de items del carrito
    const totalItemsCart = () => {
        let totalItems = 0;
        productsCart.forEach(product => totalItems += product.cantidad);
        return totalItems;
    }

    return (
        <Shop.Provider value={{productsCart, 
            addProduct, 
            removeProduct, 
            emptyCart, 
            calculoTotal,
            totalItemsCart}}>
            {children}
        </Shop.Provider>
    )
}

export default ShopProvider;