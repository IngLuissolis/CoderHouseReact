import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Item from '../Item/Item';

/*Base de Datos Local*/
import gruposBBDD from '../../BBDD/grupos.json';

const ItemList = () => {

    const {categoryId} = useParams();
    const [grupos, setGrupos] = useState([]);
    const [paises, setPaises] = useState([]);

    useEffect (() => {

        (async () => {

            const obtenerGrupos = () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(gruposBBDD);
                }, 1000)
              })
            }
      
            try {
              const responsePaises = await obtenerGrupos();
              setGrupos(responsePaises);        
            } catch (error) {
              console.log('Error: ', error);
            }

        }) ()

      if (grupos !== undefined) {
          grupos.map((grupo) => {
              if (grupo.ID === categoryId) {
                setPaises(grupo.paises);
              }
              return <></>;
          })
      }

    }, [categoryId, grupos, paises])

    return(
        <>
          <h2 key={grupos.nombre}>Grupo {categoryId}</h2>
          <div className="d-flex justify-content-center row row-cols-1 row-cols-sm-2 row-cols-lg-2 m-3">
          {paises.map((pais) => {
              return (
                  <Item key={pais.nombre} product={pais}></Item>
              )
          })}
          </div>
        </>

    );
}

export default ItemList;