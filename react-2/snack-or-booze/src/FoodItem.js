import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function FoodItem({ snacks, drinks, cantFind }) {
  const { id } = useParams();
// Search for a snack id and if not found instead search for a drink id
  let item = snacks.find(snack => snack.id === id);

  if (!item) {
    item = drinks.find(drink => drink.id === id);
  }

  if (!item) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>

          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>

          <CardText 
          className="font-italic">{item.description}
          </CardText>

          <p>
            <b>Recipe:</b> {item.recipe}
          </p>

          <p>
            <b>Serve:</b> {item.serve}
          </p>
          
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodItem;