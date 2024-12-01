import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(sessionStorage.getItem("token") || null);

	useEffect(() => {
        if (authUser) {
            sessionStorage.setItem("token", authUser);
        } else {
            sessionStorage.removeItem("token");
        }
    }, [authUser]);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};