import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { fetchOneOrder, fetchOrders, completeOrder, fetchLastOrdeerID } from "../http/ordersAPI";
import Table from 'react-bootstrap/Table';
import { Button, Card, Container, Form, Image, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Context from "..";

const OrderDetail = observer(() => {
  const {user} = useContext(Context)
  const [order, setOrder] = useState({});
  const [positions, setPositions] = useState([]);
  const {id} = useParams()

  const fetchOrder = async () => {
    const data = await fetchOneOrder(id);    
    setOrder(data)
    setPositions(data.positions)
  }

  useEffect(() => {
    fetchOrder()
  },[])

  const handleCompleteOrder = async () => {
    await completeOrder(user.lastOrderID)
    const lastOrderID = await fetchLastOrdeerID();
    user.setLastOrderID(lastOrderID)
  }

  return (
    <Container className="pt-5">
      <h3>
        Order {order.id} from {order.data}
      </h3>
        
        <Table hover>
            <thead>
              <tr>
                <th>N</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Availability</th>
                <th>Price</th>
                <th>Summa</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {positions.sort((a, b) => a.item_name > b.item_name ? 1 : -1).map((position, index) => 
                <tr key={[position.id]} >
                    <td>{index + 1}</td>
                    <td>{position.item_name}</td>
                    <td>{position.quantity}</td>
                    <td>{position.availability_info}</td>
                    <td>{position.price}</td>
                    <td>{position.quantity * position.price}                        
                    </td>
                    <td>
                      <Button variant={"outline-success"}>            
                        Delete
                      </Button>
                    </td>
                </tr>
                )} 
            </tbody>
        </Table>
        <h3>
        Total {order.summa} USD
        </h3>
        { order.status === 'P' ? 
        <Button variant={"outline-success"}
                onClick={handleCompleteOrder}>            
            Finish Order
        </Button>
        :
        <Row>
          <Col>
            <h3>
              Order is Ready for Pay
            </h3>
            { order.url_for_pay ? 
                <h3>
                    <a href={order.url_for_pay}>URL FOR PAY</a>
                </h3>
                :
                <h3>
                    Order sum more  than 999999 USD. You can't pay by card. 
                </h3>
            }
            { order.invoice ? 
                <h3>
                    <a href={order.invoice}>Invoice</a>          
                </h3>
                :
                <h3>
                    We don't have invoice. Call your manager for this.
                </h3>
            }
          </Col>
        </Row>

        }        

    </Container>
    )

});

export default OrderDetail;
