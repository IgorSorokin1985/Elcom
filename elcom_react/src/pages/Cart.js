import React, { useState, useEffect, useContext } from "react";
import { fetchOneOrder, fetchOrders, completeOrder, fetchLastOrdeerID, updatePosition, deletePosition } from "../http/ordersAPI";
import Table from 'react-bootstrap/Table';
import { useNavigate  } from "react-router-dom"
import { Button, Card, Container, Form, Image, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Context from "..";
import { ORDER_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import CarouselInfo from "../components/Carusel";

const Cart = observer(() => {
  const {user} = useContext(Context)
  const [order, setOrder] = useState({});
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate ()

  const fetchOrder = async () => {
    if (user.isAuth) {
      const fetchData = await fetchLastOrdeerID();
      user.setLastOrderID(fetchData.order_id)
      user.setUserID(fetchData.user_id)
      const data = await fetchOneOrder(user.lastOrderID);  
      const result = data.positions.map((position) => position = {
          ...position,
          newquantity: 0
      });
      setOrder(data)
      setPositions(result)
    }
  }

  useEffect(() => {
    fetchOrder()
  },[isLoading])

  const handleCompleteOrder = async () => {
    await completeOrder(user.lastOrderID);
    const lastOrderID = await fetchLastOrdeerID();
    user.setLastOrderID(lastOrderID);
    navigate(ORDER_ROUTE + "/" + order.id);
  }

  const handleDeletePosition = async (positionID) => {    
    await deletePosition(positionID);
    setIsLoading(positionID)
  }

  const handleUpdatePosition = async (changePosition) => {
    console.log(changePosition)
    await updatePosition(changePosition.id, Number(changePosition.newquantity))
    setIsLoading(changePosition)
  }

  return (
    <Container>
      <CarouselInfo />
      <h3 className="pt-5">Cart</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Availability</th>
            <th>Price</th>
            <th>Sum</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {positions.sort((a, b) => a.item_name > b.item_name ? 1 : -1).map((position, index) => (
            <tr key={position.id}>
              <td>{index + 1}</td>
              <td>{position.item_name}</td>
              <td>{position.quantity}</td>
              <td>{position.availability_info}</td>
              <td>{position.price}</td>
              <td>{position.quantity * position.price}</td>
              <td>
                <Row className="align-items-center">
                  <Col>
                    <Form.Control
                      type="number"
                      className="mr-2 mb-2"
                      placeholder={position.newquantity}
                      onChange={(e) => position.newquantity = Number(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="outline-success"
                      className="mr-2 mb-2"
                      onClick={() => handleUpdatePosition(position)}
                    >
                      Change quantity
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-danger"
                      className="mb-2"
                      onClick={() => handleDeletePosition(position.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total {order.summa} USD</h3>
      {order.status === "P" ? (
        <Button variant="outline-success" onClick={handleCompleteOrder}>
          Finish Order
        </Button>
      ) : (
        <div>
          <h3>Order is Ready for Pay</h3>
          <h3><a href={order.url_for_pay}>URL FOR PAY</a></h3>
          <Button variant="outline-success">Pay</Button>
        </div>
      )}
    </Container>
  );
});

export default Cart;

