import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ItemsList from "../components/ItemsList";
import Context from "..";
import { observer } from "mobx-react-lite";
import CarouselInfo from "../components/Carusel";

const Shop = observer(() => {
  const { user } = useContext(Context);
  
  return (
    <Container>
      <CarouselInfo />
      <Row className="pt-5">
        <Col xs={12} md={3}>
          <TypeBar />
        </Col>
        <Col xs={12} md={9}>
          <ItemsList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;