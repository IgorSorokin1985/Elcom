import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../http/ordersAPI";
import Context from "..";
import { ORDER_ROUTE } from "../utils/consts";
import { Row, Col } from "react-bootstrap";

export const OrdersList = observer(() => {
  const { user } = useContext(Context);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchUserOrders = async () => {
    const result = await fetchOrders();
    setOrders(result);
    console.log(result);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Row>
      <Col>
        <Table hover responsive>
          <thead>
            <tr>
              <th>N</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Sum</th>
              <th>Status</th>
              <th>Url for Pay</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort((a, b) => (a.id > b.id ? -1 : 1))
              .map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => navigate(ORDER_ROUTE + "/" + order.id)}
                  >
                    Order N {order.id} from {order.data}
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.summa} USD</td>
                  <td>{order.status}</td>
                  <td>
                    {order.url_for_pay ? (
                      <a href={order.url_for_pay}>URL</a>
                    ) : (
                      <div>no url</div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
});

