import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Context from "..";
import { OrdersList } from "../components/OrdersList";
import UserInfo from "../components/UserINFO";

const Profile = observer(() => {
    const user = useContext(Context);
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={3}>
            <UserInfo />
          </Col>
          <Col xs={12} md={9}>
            <OrdersList />
          </Col>
        </Row>
      </Container>
    );
});

export default Profile;