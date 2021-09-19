import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FoodContext } from "../App";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Alert } from "@material-ui/lab";

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
    flexDirection: "column",
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
  totalWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 600,
    margin: "10px 0px",
  },
});

const Cart = () => {
  const classes = useStyles();
  const context = useContext(FoodContext);
  let cartTotal = 0;
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const RemoveFromCartHandler = (element) => {
    context.cartItems.splice(context.cartItems.indexOf(element), 1);
    context.setCartItems(context.cartItems);
    context.setCartValue(context.cartItems.length);
  };

  const placeOrderHandler = () => {
    setShowAlert(true);
    context.setCartItems([]);
    context.setCartValue(0);
  };

  // func  closeHandler  for Alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Order is Placed!
        </Alert>
      </Snackbar>

      {context.cartItems.length === 0 ? (
        <>
          <Typography variant="h6" className={classes.headerWrapper}>
            No items are added to cart
          </Typography>
          <div className={classes.pizzaItemsWrapper}>
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={() => {
                history.push("/");
              }}
            >
              Order Now!
            </Button>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h6" className={classes.headerWrapper}>
            Cart Items
          </Typography>
          <div className={classes.pizzaItemsWrapper}>
            {context.cartItems?.map((element, index) => {
              cartTotal = cartTotal + parseInt(element.price);
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
                            RemoveFromCartHandler(element);
                          }}
                        >
                          Remove &nbsp; <DeleteOutlineIcon />
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
            {/* orderNow div */}
            <div className={classes.totalWrapper}>
              <Typography variant="subtitle2">
                Total : &#x20B9; {cartTotal}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={placeOrderHandler}
              >
                Place Order &nbsp; <ArrowForwardIcon />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
