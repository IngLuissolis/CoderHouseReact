/**
 * JsDocs
 * Funcion que recibe datos de usuario, productos y genera la orden
 * La orden se guarda en Firebase
 */

import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import generateOrderObjects from "./generateOrderObjects";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const saveOrder = async (nombreComprador, apellido, telefono, email, products, total) => {
    try {

        const generatedOrder = generateOrderObjects(
            nombreComprador,
            apellido,
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
            if (productInCart.cantidad > productInFirebase.stock)
                productOutOfStock.push(productInCart);
        }

        console.log("productOutOfStock: ",productOutOfStock);
        console.log("productsInFirebase: ",productsInFirebase);
        
        if (productOutOfStock.length === 0) {
            //Disminuir el stock existente
            console.log("products:" ,products);
    
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

                console.log('productInCart.stock: ',productInCart.stock);
                console.log('productInFirebase.stock: ',productInFirebase.stock);
                // Actualizo el stock del producto
                await updateDoc(productRef, {
                    stock:
                        productInFirebase.stock -
                        productInCart.cantidad,
                });
            }
    
            //Generar la orden
            const docRef = await addDoc(
                collection(db, "orders"),
                generatedOrder
            );
            MySwal.fire({
                title: `Se generó la order correctamente con ID: ${docRef.id}`,
                confirmButtonText: "ok",
            })
        } else {
            let mensaje = "";
            for (const product of productOutOfStock) {
                const productInFirebase = productsInFirebase.find(
                    (productFirebase) => productFirebase.id === product.id
                );
                console.log(productInFirebase);
                mensaje += `${product.nombre}, stock disponible: ${productInFirebase.stock}, 
                cantidad pedida: ${product.cantidad}\n`;
            }
            alert(`Hay producto/s fuera de stock: \n${mensaje}`);
        }
    } catch (error) {
        console.log("Error: ",error);
    }
}