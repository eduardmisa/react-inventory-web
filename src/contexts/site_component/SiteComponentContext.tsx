import {createContext, useContext, useState} from 'react';

export interface ISiteComponentContext {
    showDetails: boolean;
    toggleDetails: () => void;
}

const AppContext = createContext<ISiteComponentContext>({} as ISiteComponentContext);

export function SiteComponentContextProvider({ children }: any) {

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <AppContext.Provider value={{
            showDetails,
            toggleDetails
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useSiteComponentContext(): ISiteComponentContext {
    const context = useContext<ISiteComponentContext>(AppContext);
    if (context === undefined) {
        throw new Error("useSiteContext must be within SiteContextProvider")
    }
    return context;
}
