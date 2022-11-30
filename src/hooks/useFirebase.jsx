import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const useFirebase = (categoryId) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try { 
                //Codigo añadido de la documentacion firestore
                //1er paso: armar la query
                setLoading(true);
                let q;
                if (categoryId) {
                    q = query(collection(db, "items"), where("grupo", "==", categoryId))
                } else {
                    q = query(collection(db, "items"));
                }
                //2do paso: realizar la query
                const querySnapshot = await getDocs(q);
                const productosFirebase = [];
                querySnapshot.forEach((doc) => {
                    productosFirebase.push({...doc.data(), id: doc.id})
                });
                setData(productosFirebase);
              } catch (error) {
                setError(error.message);
              } finally {
                setLoading(false)
              }
        })()

    }, [categoryId])

    return [data, error, loading];

}

export default useFirebase;