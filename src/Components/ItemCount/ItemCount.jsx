import React, { useEffect, useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ID, stock}) => {

    let [count, setCount] = useState(1);
    let [guardarCarrito, setGuardarCarrito] = useState(0);
    let [carritoAux, setCarritoAux] = useState(0);

    const handleMinusCount = () => {
        (count === 1) ? console.log('valor minimo') : (setCount(count-1));
    }

    const handlePlusCount = () => {
        setCount(count + 1);
    }

    /*guarda localStorage 'carrito' en guardarCarrito */
    const HandleAddCartWidget = e => {
      e.preventDefault();
      setCarritoAux(guardarCarrito);
      setCarritoAux(carritoAux + count);
    }

    const handleChange = (event) => {
        setCount(event.target.value);
    
        // 👇️ this is the input field itself
        console.log(event.target);
    
        // 👇️ this is the new value of the input
        console.log(event.target.value);
    };

    useEffect (() => {
      if (carritoAux <= stock) {
        localStorage.setItem(ID, carritoAux);
      } else {
      console.log('Excede limite de stock');
      setCarritoAux(carritoAux-count);
      }

      setGuardarCarrito(localStorage.getItem(ID));

    }, [carritoAux, ID, count, stock]);

    

    return (
    <div className='d-flex justify-content-center p-1'>
      <div className='d-flex justify-content-around counter'>
        <div className='input-group m-1 counterIncDec'>
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-danger btn-number'
              onClick={handleMinusCount}
              name='CounterMinus'
            >
              <span className='glyphicon glyphicon-minus'></span>
            </button>
          </span>
          <input
            className='form-control input-number text-center'
            onChange={handleChange}
            value={count}
          />
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-success btn-number'
              onClick={handlePlusCount}
              name='CounterPlus'
            >
              <span className='glyphicon glyphicon-plus'></span>
            </button>
          </span>
        </div>
        <div>
            <button className='btn btn-primary m-1' 
              onClick={HandleAddCartWidget}>
              Agregar al carrito
            </button>
        </div>
      </div>
    </div>
    );
}

export default ItemCount;