import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Container, Form, Image, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneItem } from "../http/itemsAPI";
import { addPosition } from "../http/ordersAPI";
import Context from "..";
import CarouselInfo from "../components/Carusel";


const ItemDetails = () => {
  const {user} = useContext(Context)
  const [item, setItem] = useState({info: []})
  const [quantity, setQuantity] = useState(1)
  const {id} = useParams()

  useEffect(() => {
    fetchOneItem(id).then(data => setItem(data))
    console.log(item)
  }, [])

  async function addItem () {
      await addPosition(item.id, quantity, item.price);
      setQuantity(1);
  }

  return (
    <Container>
      <CarouselInfo />
      <h2 className="pt-5">{item.name}</h2>
      <Row>
        <Col lg={3} md={4} className="mb-4">
          <Card style={{height: "auto"}}>
            <Image src={item.foto} fluid />
          </Card>
        </Col>
        <Col lg={6} md={8} className="mb-4">
          <Card style={{height: "auto"}}>
            <Card.Body>
              <h4>Details</h4>
              <ul>
                <li>ID: {item.id}</li>
                <li>Power: {item.power}</li>
                <li>Speed: {item.speed}</li>
                <li>IM: {item.im}</li>
                <li>Weight: {item.weight}</li>
                <li>Stock: {item.stock}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} className="mb-4">
          <Card style={{height: "auto"}}>
            <Card.Body>
              <h2>Price</h2>
              <h3>{item.price} RUB</h3>
              <Form>
                <Form.Control
                  className="mt-3"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </Form>
              <Button
                variant="outline-success"
                className="mt-3"
                onClick={addItem}
              >
                Add to Basket
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetails;
