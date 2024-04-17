import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import Context from "..";

const Registration = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const response = await registration(name, email, password, telegram);
      user.setUser(user);
      user.setIsAuth(true);
      const token = await login(email, password);
      console.log(token);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "90%", maxWidth: 600 }} className="p-5">
        <h2 className="m-auto">Registration</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />

          <Form.Control
            className="mt-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="d-flex justify-content-between mt-3 pr-3 pl-3">
            <div>
              Have an account? <NavLink to={LOGIN_ROUTE}>Authorization</NavLink>
            </div>
            <Button variant={"outline-success"} onClick={signUp}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Registration;