import React, {useEffect, useState} from 'react';
import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';

const imgBBDD = require.context('../../img', true);

const ItemDetail = ({product}) => {

    const [producto, setProducto] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect (() => {
        (async () => {

            const obtenerProducto = () => {
                return new Promise((resolve, reject) => {
                        resolve(product);
                })
            }

            const responseProducto = await obtenerProducto();
            setProducto(responseProducto);

        })()
    },[producto, product])

    return (
      <>
        {producto.imgBandera === undefined ? (
          <></>
        ) : (
          <>
            <div key={producto.ID} className="card m-3 p-0 text-center">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="m-1 p-1">{producto.nombre}</h3>
                <img
                  className="imgBandera m-1 p-1"
                  src={imgBBDD("./" + producto.imgBandera)}
                  alt="img producto"
                />
              </div>
              <img
                className="imgCamiseta m-1"
                src={
                  isChecked
                  ? imgBBDD("./" + product.camiseta2)
                  : imgBBDD("./" + product.camiseta1)}
                alt="img camiseta"
              />
              <p className="m-2 p-0">Stock: {isChecked ? producto.camiseta2Stock : producto.camiseta1Stock}</p>
              <p>Precio: ${isChecked ? producto.camiseta2Precio : producto.camiseta1Precio}</p>
              <div className="d-flex justify-content-center align-items-center alternativaContainer ms-5 me-5">
                <input
                  className="form-check-input m-1 p-0"
                  type="checkbox"
                  value=""
                  id="firstCheckbox"
                  onChange={() => setIsChecked((prev) => !prev)}
                />
                <label
                  className="form-check-label m-1 p-0"
                  htmlFor="firstCheckbox"
                >
                  Alternativa
                </label>
              </div>
              <ItemCount
                ID={producto.ID}
                stock={
                  isChecked ? producto.camiseta2Stock : producto.camiseta1Stock
                }
              />
            </div>
          </>
        )}
      </>
    );
}

export default ItemDetail;

