import * as React from "react";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import DefaultProfile from "../../assets/DefaultProfile.jpeg";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  addJournalistReview,
  userManager,
  getJournalistReview,
} from "../../service.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  profileImgStyles: {
    borderRadius: "50%",
    margin: "10px",
  },
});

export default function RAACard() {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState("one");
  const history = useHistory();
  const [addReview, setAddReview] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [reviewRating, setReviewRating] = React.useState({
    overallRating: 5,
    ethicsRating: 5,
    writingRating: 5,
    accuracyRating: 5,
    politicalRating: 5,
    writtenReview: "",
  });

  const[reviewRatingDuplicate, setReviewRatingDuplicate] = React.useState({
    overallRating: 5,
    ethicsRating: 5,
    writingRating: 5,
    accuracyRating: 5,
    politicalRating: 5,
    writtenReview: "",
  })

  const user = userManager.getCurrentUser();

  async function setupReviews() {
    setReviews(await getJournalistReview(window.location.pathname.split('/')[2]));
  }

  React.useEffect(() => {
    setupReviews();
  }, []);
  
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const toggleAddReview = () => {
    setAddReview(!addReview);
  };

  const handleSubmitReview = async (event) => {
    try {
      await addJournalistReview(
        window.location.pathname.split("/")[2],
        user,
        reviewRating
      );
    } catch (e) {
      console.log("Add journalist review error");
    } finally {
      toggleAddReview();
      history.go(0);
    }

    event.preventDefault();
  };

  return (
    <Card
      sx={{
        borderRadius: "0",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Reviews" style={{ fontFamily: "Poppins" }} />
          <Tab value="two" label="Articles" style={{ fontFamily: "Poppins" }} />
          <Tab value="three" label="About" style={{ fontFamily: "Poppins" }} />
        </Tabs>
      </Box>
      {tabValue === "one" ? (
        <div>
          <Button onClick={toggleAddReview} style={{ fontFamily: "Poppins" }}>
            Add Review
          </Button>
          <Button onClick={toggleAddReview} style={{ fontFamily: "Poppins" }}>
            Remove Review
          </Button>
          {addReview ? (
            <Dialog
              onClose={toggleAddReview}
              aria-labelledby="add-review-dialog"
              open={addReview}
            >
              <div style={{ width: "8000px" }}>
                <DialogTitle style={{ fontFamily: "Poppins" }}>
                  Add Review
                </DialogTitle>
                <Rating
                    value={reviewRating.ethicsRating}
                    onChange={(event, newValue) => {
                      setReviewRating({
                      ...reviewRating,
                      ethicsRating: newValue,
                      });
                  }}
                />
                <Button
                    onClick={handleSubmitReview}
                    type="submit"
                    style={{ fontFamily: "Poppins" }}
                >
                Submit
                </Button>
                <DialogTitle style={{ fontFamily: "Poppins" }}>
                  Remove Review
                </DialogTitle>
                <Rating
                    value={reviewRatingDuplicate.ethicsRating}
                    onChange={(event, newValue) => {
                      setReviewRatingDuplicate({
                      ...reviewRatingDuplicate,
                      ethicsRating: newValue,
                      });
                  }}
                />
                <Button
                    onClick={toggleAddReview}
                    style={{ fontFamily: "Poppins" }}
                >
                Cancel
                </Button>

              </div>
            </Dialog>
          ) : (
            <div />
          )}
          {reviews.map((item) => (
            <div style={{ width: "100%", padding: "10px" }}>
              <ListItem>
                <ListItemAvatar>
                  <img
                    className={classes.profileImgStyles}
                    src={DefaultProfile}
                    alt="Profile Picture"
                    width="100px"
                  />
                </ListItemAvatar>
                <div>
                  <Typography
                    variant="h5"
                    component="div"
                    className={classes.nameStyles}
                  >
                    {item.reviewer}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                    className={classes.rating}
                    style={{ fontFamily: "Poppins", marginTop: "6px" }}
                  >
                    {`"${item.review}"`}
                  </Typography>
                </div>
              </ListItem>
            </div>
          ))}
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div>
          {tabValue == "two" ? (
            <div>
              <div>Articles</div>
            </div>
          ) : (
            <div>
              <div>About</div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
