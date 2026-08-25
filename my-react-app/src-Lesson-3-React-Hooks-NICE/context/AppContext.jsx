import { createContext } from "react";

//STEP 1 - CREATE THE CONTEXT
export const AppContext = createContext();

const ContextProvider = (props) => {
    const phone = "+1 123456789";
    const name = "Naressh";
    return (
       /*  <AppContext.Provider value={phone}> */
        <AppContext.Provider value={{phone,name}}>
            {props.children}
        </AppContext.Provider>
    );
};
export default ContextProvider;;