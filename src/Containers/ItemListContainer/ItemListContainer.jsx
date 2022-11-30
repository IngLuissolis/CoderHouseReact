import React from "react";
import { useParams } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import ItemList from "../../Components/ItemList/ItemList";
import Loader from "../../Components/Loader/Loader";
import './ItemListContainer.css';

const ItemListContainer = () => {

  const { categoryId } = useParams();
  const [data, error, loading] = useFirebase(categoryId)

  return (
    <>
      {(data.length && !loading &&! error)
            ? <div className="m-1p-1">
              <ItemList products={data} />
              </div>
            : error
            ? <h1>{error}</h1>
            : loading
              ? <Loader />
              : null
      }
    </>
  );
};

export default ItemListContainer;