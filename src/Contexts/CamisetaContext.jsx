
import { createContext, useState } from "react";

export const Theme = createContext({});

const ThemeProvider = ({ children }) => {
    const [themeCamiseta, setThemeCamiseta] = useState("titular");

    return (<Theme.Provider value={{themeCamiseta, setThemeCamiseta}}>
                {children}
            </Theme.Provider>);
};

export default ThemeProvider;