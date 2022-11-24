import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../Components/ItemDetail/ItemDetail';
import { Grupo } from '../../Contexts/ProductsContent';
import {ClimbingBoxLoader} from 'react-spinners';


const ItemDetailContainer = () => {

    const {producto, products, detalleProducto} = useContext(Grupo);
    // const [item,setItem] = useState();

    const {detailId} = useParams();

    console.log('ItemDetailContainer detailId: ', detailId);
    // console.log('ItemDetailContainer producto: ', item);

    useEffect (() => {
        detalleProducto(detailId);
    }, [products, detailId, detalleProducto])


    return(
        <>
            <div className="d-flex justify-content-center">
            {producto.length !== 0 ? 
                <div className="d-flex justify-content-center align-items-center">
                    <ItemDetail key={producto.id} product={producto}/>;
                </div>
                :  <ClimbingBoxLoader/>
            }
            </div>
        </>
    )

}

export default ItemDetailContainer;