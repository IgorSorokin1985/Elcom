import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Context from "..";
import { Col } from "react-bootstrap";

const TypeBar = observer(() => {
  const { itemsData } = useContext(Context);
  return (
    <Col md={12} xs={12}>
      <div>
        <ListGroup>
          {itemsData.category.map((category) => (
            <ListGroup.Item
              key={category.id}
              action
              active={category.id === itemsData.selectedCategory.id}
              onClick={() => itemsData.setSelectedCategory(category)}
            >
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Col>
  );
});

export default TypeBar;