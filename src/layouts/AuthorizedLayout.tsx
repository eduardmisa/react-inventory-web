import { useLocation } from "react-router-dom";
import { useServiceFactoryContext } from "../contexts/ServiceFactoryContext";
import AlreadyAuthorized from "../pages/AlreadyAuthorized";
import Unauthorized from "../pages/Unauthorized";
import TopNav from "../components/shared/TopNav";

//ComponentType<T>
export default function AuthorizedLayout<T>(Component: any) {
    const Auth = (props: T) => {
        const { serviceFactory } = useServiceFactoryContext();
        const authenticationService = serviceFactory.authService;
        const { pathname } = useLocation();

        // Login data added to props via redux-store (or use react context for example)
        const isLoggedIn = authenticationService.userIsLoggedIn;

        if (!isLoggedIn && !authenticationService.publicPages.includes(pathname)) {
            return <Unauthorized />
        }
        if (isLoggedIn && authenticationService.publicPages.includes(pathname)) {
            return <AlreadyAuthorized />
        }

        return (
            <>
                <TopNav></TopNav>
                <br />
                <Component {...props} />
            </>
        );
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
}