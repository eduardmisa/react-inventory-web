
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useServiceFactoryContext } from '../contexts/ServiceFactoryContext'

const AlreadyAuthorized = () => {
  const { serviceFactory } = useServiceFactoryContext();
  const authenticationService = serviceFactory.authService;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authenticationService.userIsLoggedIn
      && authenticationService.publicPages.includes(pathname)
      ) {
        navigate('/');
    }
  });

  return (
    <div>
      {/* <head>
        <title>AlreadyAuthorized</title>
        <meta name="description" content="AlreadyAuthorized page" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}

      <main>
        <h1>
          <a href="https://nextjs.org">AlreadyAuthorized!</a>
        </h1>
      </main>
    </div>
  )
}

export default AlreadyAuthorized
