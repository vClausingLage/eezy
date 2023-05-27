function LoginButton() {
  const authenticateUser = async () => {
    const response = await fetch("/auth/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <button
      onClick={() => {
        authenticateUser();
      }}
    >
      Login Button
    </button>
  );
}
export default LoginButton;
