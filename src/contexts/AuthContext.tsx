import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});


export function AuthContextProvider({ children }: any) {
    const [user, setUser] = useState({
        error: 'you are logged out, and there is no user object, and no token',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    let sharedState = {/* whatever you want */}

    return (
        <AppContext.Provider value={sharedState}>
        { children }
        </AppContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AppContext);
}