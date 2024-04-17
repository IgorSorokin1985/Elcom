import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../utils/consts";
import { addCompany } from "../http/companyAPI";
import { observer } from "mobx-react-lite";
import Context from "..";

const AddCompany = observer(() => {
  const navigate = useNavigate();
  const [inn, setINN] = useState("");
  const [kpp, setKPP] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddCompany = async () => {
    await addCompany(name, inn, kpp, address, amount);
    navigate(PROFILE_ROUTE);
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-5">
            <h2 className="text-center mb-4">Adding Company</h2>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="inn">
                <Form.Label>INN</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter INN"
                  value={inn}
                  onChange={(e) => setINN(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="kpp">
                <Form.Label>KPP</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter KPP"
                  value={kpp}
                  onChange={(e) => setKPP(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                onClick={handleAddCompany}
                className="mt-3"
              >
                Add Company
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default AddCompany;
