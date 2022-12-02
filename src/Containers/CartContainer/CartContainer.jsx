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
        email: '',
        telefono: '',
      });

    const handleClick = () => {
        MySwal.fire({  
            title: 'Generar orden de Compra',
              html: `<input type="text" id="nombre" class="swal2-input" placeholder="Ingresar nombre">
                <input type="email" id="email" class="swal2-input" placeholder="Ingresar nombre@email">
                <input type="number" id="telefono" class="swal2-input" placeholder="Ingresar telefono 1234567">`,
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonText: "Confirmar",  
            focusConfirm: false,
            preConfirm: () => {
                const nombre = MySwal.getPopup().querySelector("#nombre").value;
                const email = MySwal.getPopup().querySelector("#email").value;
                const telefono = MySwal.getPopup().querySelector("#telefono").value;
                if (!nombre || !email || !telefono) {
                    MySwal.showValidationMessage(
                        `Por favor ingrese nombre, email y telefono`
                    );
                };
                setDatos({'nombre': nombre, 'email': email, 'telefono': telefono});
            }
        })
    }

    useEffect(() => {
        if(datos.nombre !== '' && datos.email !== '' && datos.telefono !== '' && productsCart.length !== 0) {
            (async () => {
                //guardar datos de usuario y productos en order
                await saveOrder(
                    datos.nombre,
                    datos.telefono,
                    datos.email,
                    productsCart,
                    calculoTotal()
                )
            })();
            setDatos({'nombre': '', 'email': '', 'telefono': ''});
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
                        Continuar Compra
                </button>
            </div>
        </>
    );
}

export default CartContainer;