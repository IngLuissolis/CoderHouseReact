import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ItemList from "../Components/ItemList/ItemList";
import Root from "../Components/Root/Root";
import CartContainer from "../Containers/CartContainer/CartContainer";
import ItemDetailContainer from "../Containers/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "../Containers/ItemListContainer/ItemListContainer";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>No encontrado</h1>,
        children: [
            {
                path: "/",
                element: <ItemListContainer />,
            },
            {
                path: "/CoderHouseReact",
                element: <ItemListContainer />,
            },
            {
                path: "/category/:categoryId",
                element: <ItemListContainer />,
            },
            {
                path: "/detail/:id",
                element: <ItemDetailContainer />,
            },
            {
                path: "/cart",
                element: <CartContainer />,
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;