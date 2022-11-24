import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grupo } from "../../Contexts/ProductsContent";
import {ClimbingBoxLoader} from 'react-spinners';

import './ItemListContainer.css';

const imgBBDD = require.context('../../img', true);

const ItemListContainer = () => {

  const navigate = useNavigate();
  const { products } = useContext(Grupo);

  return (
    <>
      <div className="d-flex justify-content-center row row-cols-1 row-cols-sm-2 row-cols-lg-2">
      {products.length ? 
        products.map((product) => 
          {return (
            <div
              key={product.id}
              type="button"
              className="d-flex row justify-content-center m-3"
              id="divContainer"
              onClick={() => {
                navigate(`/category/${product.id}`);
              }}
            >
              <h3 className="m-2">{product.nombre}</h3>
              <div>
                 {product.pais.map((pais) => {
                    return (
                    <img
                      key={pais.nombre}
                      className="imgBandera m-3"
                      src={imgBBDD("./" + pais.imgBandera)}
                      alt="..."
                    />
                  );
                })}
              </div>
            </div>
          )})
        : <ClimbingBoxLoader/>}
      </div>
    </>
  );
};

export default ItemListContainer;