import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FoodContext } from "../App";

const useStyles = makeStyles({
  gridWrapper: {
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
  linkItem: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Header = () => {
  const classes = useStyles();
  const context = useContext(FoodContext);

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Grid
            container
            className={classes.gridWrapper}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Link to="/" className={classes.linkItem}>
                <Typography variant="h5" component="div">
                  Food Ordering Portal
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/cart" className={classes.linkItem}>
                <IconButton>
                  <Badge
                    badgeContent={context.cartvalue}
                    color="primary"
                    showZero
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
