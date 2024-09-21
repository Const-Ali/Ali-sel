import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import { useShop_Card_Cont } from "../context/Shop_Card_Cont";
import { useState } from "react";

function Login() {
  const { handleLogin } = useShop_Card_Cont();

  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div>
      <Container>
        <div className="bg-sky-400 p-12 rounded">
          <input
            onChange={handleCange}
            type="text"
            placeholder="username"
            name="username"
            value={user.username}
          />
          <input
            onChange={handleCange}
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
          />
          <Button
            onClick={() => {
              handleLogin(user.username, user.password);
            }}
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Login;
