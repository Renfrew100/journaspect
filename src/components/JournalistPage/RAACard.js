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
    overallRating: 0,
    ethicsRating: 0,
    writingRating: 0,
    accuracyRating: 0,
    politicalRating: 0,
    writtenReview: "",
  });

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
              <div style={{ width: "500px" }}>
                <DialogTitle style={{ fontFamily: "Poppins" }}>
                  Add Review
                </DialogTitle>
                <DialogTitle style={{ fontFamily: "Poppins" }}>
                  Remove Review
                </DialogTitle>
                <DialogContent>
                  {user.name}:
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      name="review"
                      required
                      multiline
                      value={reviewRating.writtenReview}
                      onChange={(event) => {
                        setReviewRating({
                          ...reviewRating,
                          writtenReview: event.target.value,
                        });
                      }}
                    />
                    <div
                      style={{
                        margin: "10px",
                        display: "inline-flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                          fontFamily: "Poppins",
                        }}
                      >
                        Overall Rating:{" "}
                        <Rating
                          value={reviewRating.overallRating}
                          onChange={(event, newValue) => {
                            setReviewRating({
                              ...reviewRating,
                              overallRating: newValue,
                            });
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                          fontFamily: "Poppins",
                        }}
                      >
                        Ethics Rating (Optional):{" "}
                        <Rating
                          value={reviewRating.ethicsRating}
                          onChange={(event, newValue) => {
                            setReviewRating({
                              ...reviewRating,
                              ethicsRating: newValue,
                            });
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                          fontFamily: "Poppins",
                        }}
                      >
                        Writing Rating (Optional):{" "}
                        <Rating
                          value={reviewRating.writingRating}
                          onChange={(event, newValue) => {
                            setReviewRating({
                              ...reviewRating,
                              writingRating: newValue,
                            });
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                          fontFamily: "Poppins",
                        }}
                      >
                        Accuracy Rating (Optional):{" "}
                        <Rating
                          value={reviewRating.accuracyRating}
                          onChange={(event, newValue) => {
                            setReviewRating({
                              ...reviewRating,
                              accuracyRating: newValue,
                            });
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                          fontFamily: "Poppins",
                        }}
                      >
                        Political Standing (Optional):{" "}
                        <Rating
                          value={reviewRating.politicalRating}
                          onChange={(event, newValue) => {
                            setReviewRating({
                              ...reviewRating,
                              politicalRating: newValue,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        onClick={handleSubmitReview}
                        type="submit"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={toggleAddReview}
                        style={{ fontFamily: "Poppins" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
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
