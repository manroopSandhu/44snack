import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FoodMenu.css";
import SnackOrBoozeApi from "./Api";
import { Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem } from "reactstrap";

function FoodMenu({ snacks, drinks, setSnacks, setDrinks }) {
  let items;
  let link;
  const location = useLocation();

  if (snacks) {
    items = snacks;
    link = 'snacks';
  } else {
    items = drinks;
    link = 'drinks';
  }

  const handleDelete = async (id) => {
    try {
      if (snacks) {
        await SnackOrBoozeApi.deleteSnack(id);
        setSnacks((prevSnacks) => prevSnacks.filter((snack) => snack.id !== id));
      } else {
        await SnackOrBoozeApi.deleteDrink(id);
        setDrinks((prevDrinks) => prevDrinks.filter((drink) => drink.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Food Menu
          </CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <ListGroup>
            {items.map((item) => (
              <ListGroupItem key={item.id}>
                <Link to={`/${link}/${item.id}`}>{item.name}</Link>
                <Button
                  className="float-right"
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
          {location.pathname === "/snacks" || location.pathname === "/drinks" ? (
            <Link to={`/add/${link}`} className="button">
              Add Item
            </Link>
          ) : null}
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodMenu;