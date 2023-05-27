import { useNavigate } from "react-router-dom";

function LoginButton() {
  const authenticateUser = async () => {
    const response = await fetch("/auth/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/login");
        // authenticateUser();
      }}
    >
      Login Button
    </button>
  );
}
export default LoginButton;
