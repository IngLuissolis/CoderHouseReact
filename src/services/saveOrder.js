/**
 * JsDocs
 * Funcion que recibe datos de usuario, productos y genera la orden
 * La orden se guarda en Firebase

 */

import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import generateOrderObjects from "./generateOrderObjects";

export const saveOrder = async (nombreComprador, telefono, email, products, total) => {
    try {

        const generatedOrder = generateOrderObjects(
            nombreComprador,
            telefono,
            email,
            products,
            total
        )

        const productOutOfStock = [];
        const productsInFirebase = [];

        //Chequear el stock de los productos en el carrito
        for (const productInCart of products) {
            const docRef = doc(db, "items", productInCart.id);
            const docSnap = await getDoc(docRef);
            const productInFirebase = { ...docSnap.data(), id: docSnap.id };
            productsInFirebase.push(productInFirebase);
            if (productInCart.camiseta1Stock > productInFirebase.camiseta1Stock)
                productOutOfStock.push(productInCart);
        }

        console.log(productOutOfStock);
        console.log(productsInFirebase);
        
        if (productOutOfStock.length === 0) {
            //Disminuir el stock existente
            console.log(products);
    
            for (const productInCart of products) {
                const productInFirebase = productsInFirebase.find(
                    (product) => product.id === productInCart.id
                );
                const productRef = doc(
                    db,
                    "items",
                    productInCart.id
                );

                console.log('productInFirebase saveOrder: ',productInFirebase);

                console.log('productInCart.camiseta1Stock: ',productInCart.camiseta1Stock);
                console.log('productInFirebase.camiseta1Stock: ',productInFirebase.camiseta1Stock);
                // Actualizo el stock del producto
                await updateDoc(productRef, {
                    camiseta1Stock:
                        productInFirebase.camiseta1Stock -
                        productInCart.camiseta1Stock,
                });
            }
    
            //Generar la orden
            const docRef = await addDoc(
                collection(db, "orders"),
                generatedOrder
            );
            alert(
                `Se generó la order correctamente con ID: ${docRef.id}`
            );
        } else {
            let mensaje = "";
            for (const product of productOutOfStock) {
                const productInFirebase = productsInFirebase.find(
                    (productFirebase) => productFirebase.id === product.id
                );
                console.log(productInFirebase);
                mensaje += `${product.nombre}, stock disponible: ${productInFirebase.camiseta1Stock}, 
                cantidad pedida: ${product.camiseta1Stock}\n`;
            }
            alert(`Hay producto/s fuera de stock: \n${mensaje}`);
        }
    } catch (error) {
        console.log(error);
    }
}