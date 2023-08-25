import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import styles from "./List.module.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles({
  profileImgStyles: {
    borderRadius: "50%",
    maxWidth: "10%",
    maxHeight: "10%",
    height: "60px",
  },
  pictureDiv: {
    display: "flex",
    justifyContent: "flex-start",
  },
  nameStyles: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "20px",
    margin: "0px 0px 0px 10px",
  },
  rating: {
    margin: "0px 0px 15px 10px",
    fontFamily: "Poppins",
    display: "inline-flex",
  },
  addJournalist: {
    fontFamily: "Poppins",
    textDecoration: "none",
    // fontSize: "15px",
  },
});

export default function FolderList(props) {
  const classes = useStyles();
  const history = useHistory();

  function navigateToJournalist(e) {
    console.log(e.currentTarget.dataset.id);
    history.push("journalist/" + e.currentTarget.dataset.id);
  }

  return (
    //render card based on the array that get back
    <div>
      <Card>
        <h1 className={styles.headerStyles}>Search Results</h1>
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
            padding: "10px",
          }}
        >
          {props.value.map((result) => (
            <div onClick={navigateToJournalist} data-id={result.id}>
              <ListItem
                style={{
                  cursor: "pointer",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                <div className={classes.pictureDiv} />
                <CardMedia
                  component="img"
                  class={classes.profileImgStyles}
                  image={result.photoURL}
                  alt="Profile Page"
                />
                <div />
                <div>
                  <Typography
                    variant="h5"
                    component="div"
                    class={classes.nameStyles}
                  >
                    {`${result.firstName} ${result.lastName}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                    class={classes.rating}
                  >
                    RATING:&nbsp;
                    {result.overallRating ? (
                      <Rating value={result.overallRating} readOnly />
                    ) : (
                      <div>None</div>
                    )}
                  </Typography>
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
          <div className={styles.addJournalistDiv}>
            <Button href="/addjournalist" class={classes.addJournalist}>
              Add Journalist
            </Button>
          </div>
          <div className={styles.addJournalistDiv}>
            <Button href="/removejournalist" class={classes.addJournalist}>
              Remove Journalist
            </Button>
          </div>
        </List>
      </Card>
    </div>
  );
}
