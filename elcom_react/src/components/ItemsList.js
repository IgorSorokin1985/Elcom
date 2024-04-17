import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ITEM_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { addPosition } from "../http/ordersAPI";
import { fetchItems, fetchCategories } from "../http/itemsAPI";
import Context from "..";

const ItemsList = observer(() => {
  const { user } = useContext(Context);
  const { itemsData } = useContext(Context);
  const navigate = useNavigate();
  const [items, setItems] = useState(
    itemsData.items.map((item) => ({
      ...item,
      quantity: 1,
    }))
  );

  const addItem = (position) => {
    const response = addPosition(position.id, position.quantity, position.price);
  };

  const handleItem = (id) => {
    if (user.isAuth) {
      navigate(ITEM_ROUTE + "/" + id);
    } else {
      navigate(LOGIN_ROUTE);
    }
  };

  const fetchItemsAndCategories = async () => {
    if (itemsData.items.length === 0) {
      const dataFetchItems = await fetchItems();
      itemsData.setItems(dataFetchItems);
      setItems(
        dataFetchItems.map((item) => ({
          ...item,
          quantity: 1,
        }))
      );
    }
    if (itemsData.category.length === 0) {
      const dataFetchCategories = await fetchCategories();
      itemsData.setCategory(dataFetchCategories);
    }
  };

  useEffect(() => {
    fetchItemsAndCategories();
  }, []);

  return (
    <Row>
      <Col>
        <Table hover responsive>
          <thead>
            <tr>
              <th>N</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              {user.isAuth && <th>Quantity</th>}
              {user.isAuth && <th>Order</th>}
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => item.category === itemsData.selectedCategory.id)
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((position, index) => (
                <tr key={position.id}>
                  <td onClick={() => handleItem(position.id)}>{index + 1}</td>
                  <td onClick={() => handleItem(position.id)}>{position.name}</td>
                  <td onClick={() => handleItem(position.id)}>{position.stock}</td>
                  <td onClick={() => handleItem(position.id)}>{position.price}</td>
                  {user.isAuth && (
                    <td>
                      <Form.Control
                        type="text"
                        placeholder={position.quantity}
                        onChange={(e) => (position.quantity = e.target.value)}
                      />
                    </td>
                  )}
                  {user.isAuth && (
                    <td>
                      <Button
                        variant={"outline-success"}
                        onClick={() => {
                          addItem(position);
                        }}
                      >
                        Add
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
});

export default ItemsList;
