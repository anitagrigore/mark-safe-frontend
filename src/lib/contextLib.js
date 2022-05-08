import { useContext, createContext } from "react";

export const AppContext = createContext({
    authenticatedUser: null,
    setAuthenticatedUser: (user) => {},
});
