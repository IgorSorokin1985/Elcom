import React from "react";
import { Button, Container } from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateItem from "../components/modals/CreateItem";

const Moderator = () => {
  return (
    <Container className="d-flex flex-column">
      <div className="mt-4 p-2">
        <CreateCategory />
      </div>
      <div className="mt-4 p-2">
        <CreateItem />
      </div>  
    </Container>
  );
};

export default Moderator;