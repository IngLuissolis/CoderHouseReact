import { collection, getDocs, query } from 'firebase/firestore';
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';

export const Grupo = createContext({});

const GrupoProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        (async () => {
    
          try { 
            //Codigo añadido de la documentacion firestore
            //1er paso: armar la query
            let q;
            q = query(collection(db, "products"));
            //2do paso: realizar la query
            const querySnapshot = await getDocs(q);
            const productosFirebase = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                productosFirebase.push({...doc.data(), id: doc.id})
            });
            setProducts(productosFirebase);
    
          } catch (error) {
            console.log('Error: ', error);
          }
          
        }) ()

        console.log('useEffect ProductsContent');
        
      }, [])

    const detalleProducto = (id) => {
      // console.log('Detalle Producto: ', id);
      products.map(paises => {
        paises.pais.map((pais) => {
          if(pais.id === id) {
            setProducto(pais);
          }
          return null;
        })
        return null;
      })
    }

    return (
        <Grupo.Provider value={{products, detalleProducto, producto}}>
            {children}
        </Grupo.Provider>
    )
}

export default GrupoProvider;