import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({onAdd, ID, stock}) => {

    let [count, setCount] = useState(1);

    const onMinusCount = () => {
        (count === 1) ? console.log('valor minimo') : (setCount(count-1));
    }

    const onPlusCount = () => {
      if (count < stock) {
        setCount(count + 1);
      }  
    }

    const handleChange = (event) => {
        setCount(event.target.value);
    
        // 👇️ this is the input field itself
        console.log(event.target);
    
        // 👇️ this is the new value of the input
        console.log(event.target.value);
    };

    return (
    <div className='d-flex justify-content-center p-1'>
      <div className='d-flex justify-content-around counter'>
        <div className='input-group m-1 counterIncDec'>
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-danger btn-number'
              onClick={onMinusCount}
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
              onClick={onPlusCount}
              name='CounterPlus'
            >
              <span className='glyphicon glyphicon-plus'></span>
            </button>
          </span>
        </div>
        <div>
            <button className='btn btn-primary m-1' 
              onClick={()=>onAdd(count, stock)}>
              Agregar al carrito
            </button>
        </div>
      </div>
    </div>
    );
}

export default ItemCount;