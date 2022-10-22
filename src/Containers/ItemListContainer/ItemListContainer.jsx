import React from "react";
import './ItemListContainer.css';

//Destructuring al props para mejor legilibilidad del codigo, porque es un objeto
//En el caso de no utilizar destructuring seria props.mensaje y props.temp
const ItemListContainer = ({ greeting }) => {
  return (
    <div>
      <h2>{greeting}</h2>
      <a href="https://imgflip.com/i/6xu8fx" className=''>
        <img src="https://i.imgflip.com/6xu8fx.jpg" title="made at imgflip.com" alt='img'/>
      </a>
    </div>
  );
};

export default ItemListContainer;