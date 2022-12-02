import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Item.css';

const imgBBDD = require.context('../../img', true);

const Item = ({product}) => {

  const navigate = useNavigate();

  const pulsado = () => {
    navigate(`/detail/${product.id}`);
}

  return (
    <>
      <button 
        onClick={pulsado} 
        className="card d-flex justify-content-center m-3 p-1 button"
        key={product.id}
      >
        <div className="m-1 p-0">
          <div className="d-flex justify-content-center align-items-center m-1 p-0">
            <h3 className="m-1 p-1">{product.nombre}</h3>
            <img 
              className="imgBandera m-1 p-1" 
              src={imgBBDD("./" + product.imgBandera)} 
              alt="item"/>
          </div>
          <img 
            className="card-img-top p-2 m-0 imgCamiseta"
            src={imgBBDD("./" + product.imgCamiseta)}
            alt="camiseta"/>
          <p className="m-1 p-1">stock: {product.stock}</p>
          <p className="m-1 p-1">Precio: ${product.precio}</p>
        </div>
      </button>
    </>
  );
}

export default Item;