import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grupo } from '../../Contexts/ProductsContent';
import './Item.css';

const imgBBDD = require.context('../../img', true);

//Card
const Item = ({product}) => {

  const [isChecked, setIsChecked] = useState(false);
  const { detalleProducto } = useContext(Grupo);

  const navigate = useNavigate();

  const pulsado = () => {
    navigate(`/detail/${product.id}`);
    detalleProducto(product.id);
}

  return (
    <>
    <div
      className="card m-3 p-0 d-flex justify-content-center"
      key={product.id}
    >
      <div
        className="bg-transparent 
          d-flex justify-content-around align-items-center m-1 p-0"
      >
        <h3>{product.nombre}</h3>
        <img
          className="imgBandera m-1"
          src={imgBBDD("./" + product.imgBandera)}
          alt="..."
        />
      </div>
      <img
        src={
          isChecked
            ? imgBBDD("./" + product.camiseta2)
            : imgBBDD("./" + product.camiseta1)
        }
        className="card-img-top p-2 m-0 imgCamiseta"
        alt="..."
      ></img>
      <p className="m-2 p-0">
        Precio: ${isChecked ? product.camiseta2Precio : product.camiseta1Precio}
      </p>
      <div className="d-flex justify-content-center align-items-center alternativaContainer ms-5 me-5">
        <input
          className="form-check-input m-1 p-0"
          type="checkbox"
          value=""
          id="firstCheckbox"
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <label className="form-check-label m-1 p-0" >
          Alternativa
        </label>
      </div>
      <div className="card-body d-flex justify-content-around align-items-center m-1 p-1">
        <button
          type="button"
          className="btn btn-primary"
          onClick={pulsado}
        >
          Detalles
        </button>
      </div>
    </div>
    </>
  );
}

export default Item;