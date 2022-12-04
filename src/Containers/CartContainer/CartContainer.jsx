import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import CartItem from "../../Components/Cart/CartItem";
import { Shop } from "../../Contexts/CartContext";
import { saveOrder } from "../../services/saveOrder";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './CartContainer.css';

const MySwal = withReactContent(Swal);

const CartContainer = () => {

    const {productsCart, calculoTotal, emptyCart} = useContext(Shop);
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
      });

    const handleClick = () => {
        MySwal.fire({  
            title: 'Generar orden de Compra',
              html: `<input type="text" id="nombre" class="swal2-input" placeholder="Ingresar nombre">
                <input type="text" id="apellido" class="swal2-input" placeholder="Ingresar apellido">
                <input type="email" id="email" class="swal2-input" placeholder="Ingresar nombre@email">
                <input type="email" id="emailRepetido" class="swal2-input" placeholder="Repetir nombre@email">
                <input type="number" id="telefono" class="swal2-input" placeholder="Ingresar telefono 1234567">`,
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonText: "Realizar Compra",
            showConfirmButton: true,
            focusConfirm: false,

            didOpen: (result) => {
                //Muestra ConfirmButton solo si email u emailRepetido coinciden
                result.addEventListener('keyup', function(e) {
                if(MySwal.getPopup().querySelector("#email").value === 
                    MySwal.getPopup().querySelector("#emailRepetido").value && 
                    MySwal.getPopup().querySelector("#email").value !== '' && 
                    MySwal.getPopup().querySelector("#emailRepetido").value !== '') {
                        //MySwal.enableButtons(MySwal.getConfirmButton());
                        
                        console.log("Mails coinciden");
                } else {
                    console.log("Esperando que coincidan email's");
                }
                })
            },

            preConfirm: () => {
                const nombre = MySwal.getPopup().querySelector("#nombre").value;
                const apellido = MySwal.getPopup().querySelector("#apellido").value;
                const email = MySwal.getPopup().querySelector("#email").value;
                const emailRepetido = MySwal.getPopup().querySelector("#emailRepetido").value;
                const telefono = MySwal.getPopup().querySelector("#telefono").value;
                if (!nombre || !apellido || !email || !emailRepetido || !telefono) {
                    MySwal.showValidationMessage(
                        `Por favor ingrese nombre, apellido, email y telefono`
                    );
                };
                if(email !== emailRepetido ) {
                    MySwal.showValidationMessage(
                        `Email's no coinciden`
                    );
                };
                setDatos({'nombre': nombre, 'apellido': apellido, 'telefono': telefono, 
                'email': email, 'emailRepetido': emailRepetido, });
            },

        })
    }

    useEffect(() => {
        if(datos.nombre !== '' && datos.apellido !== '' && datos.email !== '' 
            && datos.telefono !== '' && productsCart.length !== 0 
            && datos.email === datos.emailRepetido) {
            (async () => {
                //guardar datos de usuario y productos en order
                await saveOrder(
                    datos.nombre,
                    datos.apellido,
                    datos.telefono,
                    datos.email,
                    productsCart,
                    calculoTotal()
                )
            })();
            setDatos({'nombre': '', 'apellido': '','email': '',
            'emailRepetido': '', 'telefono': ''});
            emptyCart();
        } else if (productsCart.length === 0) {
            console.log("No se genero orden - Carrito sin Productos");
        }
    },[datos, calculoTotal, emptyCart, productsCart]);

    return(
        <>
            {
                productsCart.length === 0 ?
                    <h3 className="carritoVacio">Tu carrito está vacío</h3>
                : productsCart.map(product => {
                    return (
                        <CartItem key={product.id} item={product} />
                        );
                    })
            }

            <h2 className="d-flex justify-content-end m-3 p-1">Total ${calculoTotal().toLocaleString()}</h2>
            <div className="d-flex justify-content-end">
                <button className="btn btn-info m-2 p-3" 
                    onClick={handleClick}>
                        Generar Orden
                </button>
            </div>
        </>
    );
}

export default CartContainer;