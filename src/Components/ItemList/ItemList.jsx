import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Grupo } from "../../Contexts/ProductsContent";
import {ClimbingBoxLoader} from 'react-spinners';
import Item from '../Item/Item';

const ItemList = () => {

  const { products } = useContext(Grupo);
  const { categoryId } = useParams();

  return (
    <>
      <div className="d-flex justify-content-center">
        {products.length ? 
        (products.map(grupo => {
          if (grupo.id === categoryId) {
            return (
              <div key={grupo.id} className='m-2'>
                <h2 className="m-1">{grupo.nombre}</h2>
                <div className="d-flex justify-content-center row row-cols-1 row-cols-sm-2 row-cols-lg-2 m-2">
                {grupo.pais.map(pais => {
                  return <Item key={pais.id} product={pais}></Item>;
                }) }
                </div>
              </div>
              )
          }
          return null;
        })) : <ClimbingBoxLoader/>
        }
      </div>
    </>
  );
}

export default ItemList;

