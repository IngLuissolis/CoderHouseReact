import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../Components/ItemDetail/ItemDetail';
// import {ClimbingBoxLoader} from 'react-spinners';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../../Components/Loader/Loader';


const ItemDetailContainer = () => {

    const [item,setItem] = useState(null);
    const {id} = useParams();

    useEffect (() => {
        const getItemDetail = async () => {
            const docRef = doc(db, "items", id);

            //2do generar la petición
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setItem({...docSnap.data(), id: docSnap.id})
            } else {
                console.log("No such document!");
            }
        }
        getItemDetail();
    }, [id])


    return(
        <>
            <div className="d-flex justify-content-center">
            {item ? 
                <div className="d-flex justify-content-center align-items-center">
                    <ItemDetail product={item}/>
                </div>
                :  <Loader />
            }
            </div>
        </>
    )
}

export default ItemDetailContainer;