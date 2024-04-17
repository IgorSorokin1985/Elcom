import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { fetchLastOrdeerID } from "../http/ordersAPI";
import Context from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const response = await login(email, password);
      user.setUser(user);
      user.setIsAuth(true);
      const data = await fetchLastOrdeerID();
      user.setLastOrderID(data.order_id);
      user.setUserID(data.user_id);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-5">
            <h2 className="text-center mb-4">Authorization</h2>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between mt-3 pr-3 pl-3">
                <div>
                  No account?{" "}
                  <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                </div>
                <Button
                  variant="success"
                  onClick={signIn}
                  className="align-self-center"
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Auth;

