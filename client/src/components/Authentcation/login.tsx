import { useAuth0 } from "@auth0/auth0-react";

import "./CSS/login.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button id="login-button" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
