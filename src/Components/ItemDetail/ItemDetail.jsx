import React, { useState } from 'react';
import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useContext } from 'react';
import { Shop } from '../../Contexts/CartContext';

const imgBBDD = require.context('../../img', true);

const ItemDetail = ({product}) => {

    const {addProduct} = useContext(Shop);
    // const [quantityItemDetail, setQuantityItemDetail] = useState(0);
    // const [producto, setProducto] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    // console.log('ItemDetail product: ', product);

    const confirmPurchase = (quantity) => {
      // console.log('quantity ItemDetail: ',quantity);
      addProduct({...product, quantity});
      // setQuantityItemDetail(quantity);
    }

    return (
      <>
        {product.imgBandera === null ? (
          <></>
        ) : (
          <>
            <div key={product.id} className="card m-3 p-0 text-center">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="m-1 p-1">{product.nombre}</h3>
                <img
                  className="imgBandera m-1 p-1"
                  src={imgBBDD("./" + product.imgBandera)}
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
              <p className="m-2 p-0">Stock: {isChecked ? product.camiseta2Stock : product.camiseta1Stock}</p>
              <p>Precio: ${isChecked ? product.camiseta2Precio : product.camiseta1Precio}</p>
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
              <ItemCount onAdd={confirmPurchase} ID={product.id}
                stock={
                  isChecked ? product.camiseta2Stock : product.camiseta1Stock}/>
            </div>
          </>
        )}
      </>
    );
}

export default ItemDetail;