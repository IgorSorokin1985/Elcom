import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Context from "..";
import { userInfo } from "../http/userAPI";
import { companyInfo, deleteCompany } from "../http/companyAPI";
import { ADD_COMPANY_ROUTE, SHOP_ROUTE } from "../utils/consts";

const UserInfo = observer(() => {
  const { user } = useContext(Context);
  const [userInfoData, setUserInfo] = useState({});
  const [companyInfoData, setCompanyInfo] = useState({});
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const result = await userInfo(user.userID);
      setUserInfo(result);
      if (result.company) {
        const resultCompany = await companyInfo(result.company);
        setCompanyInfo(resultCompany);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(companyInfoData.id);
      navigate(SHOP_ROUTE);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Card.Text>
                <p>
                  <strong>UserName:</strong> {userInfoData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userInfoData.email}
                </p>
                <p>
                  <strong>Telegram:</strong> {userInfoData.telegram_chat_id}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          {userInfoData.company ? (
            <Card>
              <Card.Body>
                <Card.Title>Company Information</Card.Title>
                <Card.Text>
                  <p>
                    <strong>Name of Company:</strong> {companyInfoData.name}
                  </p>
                  <p>
                    <strong>INN:</strong> {companyInfoData.inn}
                  </p>
                  <p>
                    <strong>KPP:</strong> {companyInfoData.kpp}
                  </p>
                  <p>
                    <strong>Address:</strong> {companyInfoData.address}
                  </p>
                  <p>
                    <strong>Amount:</strong> {companyInfoData.amount}
                  </p>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={handleDeleteCompany}
                >
                  Delete Company
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>No Company Information</Card.Title>
                <Card.Text>
                  <p>We don't have information about your company</p>
                </Card.Text>
                <Button
                  variant="outline-success"
                  onClick={() => navigate(ADD_COMPANY_ROUTE)}
                >
                  Add Company
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
});

export default UserInfo;
