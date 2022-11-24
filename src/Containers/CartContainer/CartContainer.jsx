import React from "react";
// import { useState } from "react";
import { useContext } from "react";
import Cart from "../../Components/Cart/Cart";
import { Shop } from "../../Contexts/CartContext";
import generateOrderObjects from "../../services/generateOrderObjects";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";



const CartContainer = () => {

    const {productsCart, totalItemsCart, calculoTotal} = useContext(Shop);

    console.log('CartContainer: ', productsCart);

    const confirmPurchase = () => {
        //mostrar el formulario de compra donde el usuario ingrese sus datos
        const nombreComprador = "Luis";
        const telefonoComprador = 11111;
        const emailComprador = "email@gmail.com";

        const generatedOrder = generateOrderObjects(
            nombreComprador,
            emailComprador,
            telefonoComprador,
            productsCart,
            calculoTotal()
        );
        console.log('generatedOrder: ', generatedOrder);

        let productOutOfStock = [];

        console.log('productsCart: ', productsCart);

        //Chequear stock de los productos del carrito
        productsCart.forEach(async (productInCart) => {

            // console.log('productInCart: ', productInCart.id);

            const docRef = doc(db, "products", productInCart.grupo);
            const docSnap = await getDoc(docRef);

            console.log('docSnap: ', docSnap.data());

            docSnap.data().pais.map(productInFirebase => {
                if (productInFirebase.id === productInCart.id) {
                    console.log('productInFirebase: ',  productInFirebase.id, 
                    'Stock: ', productInFirebase.camiseta1Stock);
                    if (productInCart.quantity > productInFirebase.camiseta1Stock) 
                        productOutOfStock.push(productInCart);
                }
                return null;
            })
            // const productInFirebase = {...docSnap.data(), id: doc.id};

            // console.log('docRef: ', docRef);
            // console.log('docSnap: ', docSnap.data());
            // console.log('doc.id: ', doc.id);
            // console.log('productInFirebase: ', productInFirebase);

            // //Si quantity en carrito es mayor que stock en Firebase no se puede generar orden
            // if (productInCart.quantity > productInFirebase.camiseta1Stock) 
            //     productOutOfStock.push(productInCart);

            console.log('productOutOfStock.length: ', productOutOfStock.length);

            if (productOutOfStock.length === 0) {
                //Disminuir el stock
                console.log('Hay stock de productos en carrito');

                productsCart.forEach(async (productInCart) => {
                    const docRef = doc(db, "products", productInCart.grupo);
                    const docSnap = await getDoc(docRef);

                    console.log('docSnap.data(): ', docSnap.data());
                    console.log('id: doc.id: ', doc.id);

                    docSnap.data().pais.map(async(productInFirebase, index) => {
                        if (productInFirebase.id === productInCart.id) {

                            console.log('productInFirebase: ', productInFirebase);
                            console.log('index: ', index);
                            console.log('productInFirebase Disminuir Stock: ',  productInFirebase.id, 
                            'Stock: ', productInFirebase.camiseta1Stock);

                            productInFirebase.camiseta1Stock = productInFirebase.camiseta1Stock - productInCart.quantity;

                            // To update camiseta1Stock in productInFirebase.id:
                            await updateDoc(docRef, {
                                paises: [
                                    productInFirebase
                                ]
                            });
                        }
                    })
                    
                });
            } else {
                productOutOfStock.map(product => {
                    return console.log('producto fuera de stock', product.id);
                })
            }

            // console.log('productOutOfStock: ', productOutOfStock);

            // if (productOutOfStock.length === 0) {
            //     //Disminuir el stock
            //     products.forEach(async (productInCart) => {
            //         const docRef = doc(db, "products", productInCart.id);

            //         await updateDoc(docRef, {
            //             camiseta1Stock: productInFirebase.camiseta1Stock - productInCart.quantity
            //         });

            //     })
            //     //Generar la orden
            //     console.log('Generar orden');
            // } else {
            //     alert('Hay algun producto supera stock')
            // }

        })


    }

    return(
        <>
            {productsCart.map(product => {
                console.log('CartContainer: ',product);
                return <Cart item={product} key={product.id}/>;
            })}
            <h2 className="d-flex justify-content-end m-2 p-1">Total {totalItemsCart()}</h2>
            <button className="btn btn-success p-3" onClick={confirmPurchase}>Confirmar Compra</button>
        </>
    );
}

export default CartContainer;