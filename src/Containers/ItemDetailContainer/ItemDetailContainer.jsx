import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../Components/ItemDetail/ItemDetail';

/*Base de Datos Local*/
import gruposTodos from '../../BBDD/paises.json';

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState([]);

    const {detailId} = useParams();

    useEffect (() => {
        (async () => {

            const obtenerProducto = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(gruposTodos);
                    },)
                })
            }

            const responseProducto = await obtenerProducto();
            setProducto(responseProducto);

            responseProducto.map((pais) => {
                if (pais.ID === detailId) {
                  console.log('Ingreso if: ', pais);
                  setProducto(pais);
                }
              })

        })()
    },[detailId])

    return(
        <>
            <div className="d-flex justify-content-center align-items-center">
                <ItemDetail product={producto}/>
            </div>
        </>
    )

}

export default ItemDetailContainer;