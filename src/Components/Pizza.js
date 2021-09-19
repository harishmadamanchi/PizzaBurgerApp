import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { FoodContext } from "../App";
import { FoodData } from "./Data";

const useStyles = makeStyles({
  headerWrapper: {
    textAlign: "center",
    margin: 15,
  },
  pizzaItemsWrapper: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pizzaItem: {
    display: "flex",
    margin: "10px 0px",
    padding: 10,
    maxWidth: 600,
  },
  pizzaItemLeft: {
    display: "flex",
    direction: "column",
    width: 500,
  },
  cardImg: {
    width: 200,
  },
  priceWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },
  content: {
    minWidth: 400,
  },
});

const Pizza = () => {
  const context = useContext(FoodContext);
  const [pizzaItems, setPizzaItems] = useState([]);

  const getData = () => {
    if (context.items.length === 0) {
      setPizzaItems(FoodData[0].subItemsData);
    } else {
      setPizzaItems(context.items[0].subItemsData);
    }
  };

  useEffect(() => {
    getData();
  });

  const classes = useStyles();

  const AddToCartHandler = (element) => {
    context.cartItems.push(element);
    context.setCartValue(context.cartItems.length);
  };

  return (
    <>
      <Typography variant="h6" className={classes.headerWrapper}>
        {pizzaItems.name}
      </Typography>
      {/* {console.log(pizzaItems?.subItems)} */}
      <div className={classes.pizzaItemsWrapper}>
        {pizzaItems.subItems?.map((element, index) => {
          return (
            <Card className={classes.pizzaItem} key={index}>
              <div className={classes.pizzaItemLeft}>
                <CardContent className={classes.content}>
                  <Typography variant="h6" component="h6">
                    {element.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {element.description}
                  </Typography>
                  <div className={classes.priceWrapper}>
                    <Typography variant="h6" color="textPrimary">
                      &#x20B9; {element.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        AddToCartHandler(element);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </div>
              <CardMedia
                image={element.image}
                title={element.name}
                className={classes.cardImg}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Pizza;
