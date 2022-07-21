import { createContext, useContext } from 'react';
import { ServiceFactory } from '../_services/ServiceFactory';

interface IServiceFactoryContext {
    serviceFactory: ServiceFactory
}

const AppContext = createContext<IServiceFactoryContext>({
    serviceFactory: new ServiceFactory()
});

export function ServiceFactoryContext({ children }: any) {
    
    return (
        <AppContext.Provider value={{
            serviceFactory: new ServiceFactory()
        }}>
        { children }
        </AppContext.Provider>
    );
}

export function useServiceFactoryContext(): IServiceFactoryContext {
    return useContext<IServiceFactoryContext>(AppContext);
}
