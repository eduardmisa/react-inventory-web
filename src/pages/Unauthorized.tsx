import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/login');
  });

  return (
    <div>
      {/* <head>
        <title>Unauthorized</title>
        <meta name="Unauthorized" content="Unauthorized page" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}

      <main>
        <h1>
          You are <a href="https://nextjs.org">Unauthorized!</a>
        </h1>
      </main>
    </div>
  )
}

export default Unauthorized
