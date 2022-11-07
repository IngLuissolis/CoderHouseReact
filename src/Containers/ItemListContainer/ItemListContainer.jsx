import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './ItemListContainer.css';

/*Base de Datos Local*/
import gruposBBDD from '../../BBDD/grupos.json';

const imgBBDD = require.context('../../img', true);

const ItemListContainer = () => {

  const [grupos, setGrupos] = useState([]);
  const [grupo, setGrupo] = useState();
  const [paises, setPaises] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
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
        setPaises(grupos);
      } catch (error) {
        console.log('Error: ', error);
      }
    }) ()

    if (grupo !== undefined) {
      navigate(`/category/${grupo}`);
    }  else {
      console.log('error - undefined');
    }
    
  }, [grupos, grupo, paises, navigate])

  return (
    <>
      <div
        key={grupos.nombre}
        className="d-flex justify-content-center row row-cols-1 row-cols-sm-2 row-cols-lg-2"
      >
        {grupos.map((grupo) => {
          return (
            <div
              key={grupo.ID}
              type="button"
              className="d-flex row justify-content-center m-3"
              id="divContainer"
              onClick={() => {
                setPaises(grupo.paises);
                setGrupo(grupo.ID);
              }}
            >
              <h3 className="m-2">{grupo.nombre}</h3>
              <div>
                {grupo.paises.map((pais) => {
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
          );
        })}
      </div>
    </>
  );
};

export default ItemListContainer;