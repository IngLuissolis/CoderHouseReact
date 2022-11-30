import React from "react";
import Item from '../Item/Item';

const ItemList = ({products}) => {

  return (
    <>
      <div className="d-flex justify-content-center row row-cols-1 row-cols-sm-2 m-2 p-2">
            {products.map((product) => {
                return <Item key={product.id} product={product} />;
            })}
        </div>
    </>
  );
}

export default ItemList;

