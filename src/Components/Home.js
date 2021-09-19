import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FoodContext } from "../App";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 180,
  },
  gridContainer: {
    display: "flex",
  },
  gridItem: {
    margin: 20,
    width: 200,
  },
  linkItem: {
    textDecoration: "none",
  },
});

const Home = () => {
  const classes = useStyles();

  const context = useContext(FoodContext);
  return (
    <>
      <Grid container justifyContent="center" className={classes.gridContainer}>
        {context.items.map((element, index) => {
          return (
            <React.Fragment key={index}>
              <div className={classes.gridItem}>
                <Link to={`/${element.name}`} className={classes.linkItem}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={element.image}
                        title={element.name}
                      />
                      <CardContent>
                        <Typography variant="h5">{element.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
