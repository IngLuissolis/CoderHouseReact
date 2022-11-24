import React, { createContext, useState } from 'react';

export const Shop = createContext({});

const ShopProvider = ({children}) => {

    const [productsCart, setProductsCart] = useState([]);

    const addProduct = (productToAdd) => {

        const flagRepetead = isInCart(productToAdd.id);
        console.log('productToAdd: ', productToAdd);

        if (flagRepetead) {
            //Lógica para agregar la quantity y no agregar el producto entero

            //1ero encontramos producto repetido y le adicionamos la cantidad correspondiente
            const productoRepetidoModificado = productsCart.find(
                productInCart => productInCart.id === productToAdd.id);

            if ((productoRepetidoModificado.quantity + productToAdd.quantity) <= productoRepetidoModificado.camiseta1Stock) {
                productoRepetidoModificado.quantity += productToAdd.quantity;
                //2do quitamos el producto repetido del carrito y colocamos el producto repetido pero modificado
                const productoCartSinRepetido = productsCart.filter(productsInCart => 
                    productsInCart.id !== productToAdd.id);
                    setProductsCart([...productoCartSinRepetido, productoRepetidoModificado])
            } else {
                console.log('No se puede agregar a carrito - Supera Stock');
            }
            
        } else {
            setProductsCart([...productsCart, productToAdd]);
        }

        console.log('products CartContext: ', productsCart);

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

    //Cálculo del total
    const calculoTotal = () => {
        const total = productsCart.reduce((acumulador, productoActual) => 
        acumulador += productoActual.quantity * productoActual.camiseta1Precio, 0);
        return total;
    }

    //Cálculo del total de items del carrito
    const totalItemsCart = () => {
        let totalItems = 0;
        productsCart.forEach(product => totalItems += product.quantity)
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