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
          <Tab value="four" label="Journalists" style={{ fontFamily: "Poppins" }} />
          <Tab value="five" label="Test" style={{ fontFamily: "Poppins" }} />
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

          {tabValue === "three" ? (
            <div>
              <div>Day handsome addition horrible sensible goodness two contempt. Evening for married his account removal. Estimable me disposing of be moonlight cordially curiosity. Delay rapid joy share allow age manor six. Went why far saw many knew. Exquisite excellent son gentleman acuteness her. Do is voice total power mr ye might round still.

                  Dependent certainty off discovery him his tolerably offending. Ham for attention remainder sometimes additions recommend fat our. Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment use tolerably dependent listening men. No peculiar in handsome together unlocked do by. Article concern joy anxious did picture sir her. Although desirous not recurred disposed off shy you numerous securing.

                  Carried nothing on am warrant towards. Polite in of in oh needed itself silent course. Assistance travelling so especially do prosperous appearance mr no celebrated. Wanted easily in my called formed suffer. Songs hoped sense as taken ye mirth at. Believe fat how six drawing pursuit minutes far. Same do seen head am part it dear open to. Whatever may scarcely judgment had.

                  Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in. Society or if excited forbade. Here name off yet she long sold easy whom. Differed oh cheerful procured pleasure securing suitable in. Hold rich on an he oh fine. Chapter ability shyness article welcome be do on service.

                  Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how.

                  Ye on properly handsome returned throwing am no whatever. In without wishing he of picture no exposed talking minutes. Curiosity continual belonging offending so explained it exquisite. Do remember to followed yourself material mr recurred carriage. High drew west we no or at john. About or given on witty event. Or sociable up material bachelor bringing landlord confined. Busy so many in hung easy find well up. So of exquisite my an explained remainder. Dashwood denoting securing be on perceive my laughing so.

                  Man request adapted spirits set pressed. Up to denoting subjects sensible feelings it indulged directly. We dwelling elegance do shutters appetite yourself diverted. Our next drew much you with rank. Tore many held age hold rose than our. She literature sentiments any contrasted. Set aware joy sense young now tears china shy.

                  May indulgence difficulty ham can put especially. Bringing remember for supplied her why was confined. Middleton principle did she procuring extensive believing add. Weather adapted prepare oh is calling. These wrong of he which there smile to my front. He fruit oh enjoy it of whose table. Cultivated occasional old her unpleasing unpleasant. At as do be against pasture covered viewing started. Enjoyed me settled mr respect no spirits civilly.

                  Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy.

                  Can curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings.
              </div>
            </div>
          ) : (
            <div>
            </div>
          )}
          
          {tabValue === "four" ? (
            <div>
              <div>Day handsome addition horrible sensible goodness two contempt. Evening for married his account removal. Estimable me disposing of be moonlight cordially curiosity. Delay rapid joy share allow age manor six. Went why far saw many knew. Exquisite excellent son gentleman acuteness her. Do is voice total power mr ye might round still.

                  Dependent certainty off discovery him his tolerably offending. Ham for attention remainder sometimes additions recommend fat our. Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment use tolerably dependent listening men. No peculiar in handsome together unlocked do by. Article concern joy anxious did picture sir her. Although desirous not recurred disposed off shy you numerous securing.

                  Carried nothing on am warrant towards. Polite in of in oh needed itself silent course. Assistance travelling so especially do prosperous appearance mr no celebrated. Wanted easily in my called formed suffer. Songs hoped sense as taken ye mirth at. Believe fat how six drawing pursuit minutes far. Same do seen head am part it dear open to. Whatever may scarcely judgment had.

                  Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in. Society or if excited forbade. Here name off yet she long sold easy whom. Differed oh cheerful procured pleasure securing suitable in. Hold rich on an he oh fine. Chapter ability shyness article welcome be do on service.

                  Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how.

                  Ye on properly handsome returned throwing am no whatever. In without wishing he of picture no exposed talking minutes. Curiosity continual belonging offending so explained it exquisite. Do remember to followed yourself material mr recurred carriage. High drew west we no or at john. About or given on witty event. Or sociable up material bachelor bringing landlord confined. Busy so many in hung easy find well up. So of exquisite my an explained remainder. Dashwood denoting securing be on perceive my laughing so.

                  Man request adapted spirits set pressed. Up to denoting subjects sensible feelings it indulged directly. We dwelling elegance do shutters appetite yourself diverted. Our next drew much you with rank. Tore many held age hold rose than our. She literature sentiments any contrasted. Set aware joy sense young now tears china shy.

                  May indulgence difficulty ham can put especially. Bringing remember for supplied her why was confined. Middleton principle did she procuring extensive believing add. Weather adapted prepare oh is calling. These wrong of he which there smile to my front. He fruit oh enjoy it of whose table. Cultivated occasional old her unpleasing unpleasant. At as do be against pasture covered viewing started. Enjoyed me settled mr respect no spirits civilly.

                  Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy.

                  Can curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings.
              </div>
            </div>
          ) : (
            <div>
            </div>
          )
          }

        {tabValue === "five" ? (
            <div>
              <div>Day handsome addition horrible sensible goodness two contempt. Evening for married his account removal. Estimable me disposing of be moonlight cordially curiosity. Delay rapid joy share allow age manor six. Went why far saw many knew. Exquisite excellent son gentleman acuteness her. Do is voice total power mr ye might round still.

                  Dependent certainty off discovery him his tolerably offending. Ham for attention remainder sometimes additions recommend fat our. Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment use tolerably dependent listening men. No peculiar in handsome together unlocked do by. Article concern joy anxious did picture sir her. Although desirous not recurred disposed off shy you numerous securing.

                  Carried nothing on am warrant towards. Polite in of in oh needed itself silent course. Assistance travelling so especially do prosperous appearance mr no celebrated. Wanted easily in my called formed suffer. Songs hoped sense as taken ye mirth at. Believe fat how six drawing pursuit minutes far. Same do seen head am part it dear open to. Whatever may scarcely judgment had.

                  Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing he juvenile in. Society or if excited forbade. Here name off yet she long sold easy whom. Differed oh cheerful procured pleasure securing suitable in. Hold rich on an he oh fine. Chapter ability shyness article welcome be do on service.

                  Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how.

                  Ye on properly handsome returned throwing am no whatever. In without wishing he of picture no exposed talking minutes. Curiosity continual belonging offending so explained it exquisite. Do remember to followed yourself material mr recurred carriage. High drew west we no or at john. About or given on witty event. Or sociable up material bachelor bringing landlord confined. Busy so many in hung easy find well up. So of exquisite my an explained remainder. Dashwood denoting securing be on perceive my laughing so.

                  Man request adapted spirits set pressed. Up to denoting subjects sensible feelings it indulged directly. We dwelling elegance do shutters appetite yourself diverted. Our next drew much you with rank. Tore many held age hold rose than our. She literature sentiments any contrasted. Set aware joy sense young now tears china shy.

                  May indulgence difficulty ham can put especially. Bringing remember for supplied her why was confined. Middleton principle did she procuring extensive believing add. Weather adapted prepare oh is calling. These wrong of he which there smile to my front. He fruit oh enjoy it of whose table. Cultivated occasional old her unpleasing unpleasant. At as do be against pasture covered viewing started. Enjoyed me settled mr respect no spirits civilly.

                  Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy.

                  Can curiosity may end shameless explained. True high on said mr on come. An do mr design at little myself wholly entire though. Attended of on stronger or mr pleasure. Rich four like real yet west get. Felicity in dwelling to drawings. His pleasure new steepest for reserved formerly disposed jennings.
              </div>
            </div>
          ) : (
            <div>
            </div>
          )
          }
        </div>
      )
    }
    </Card>
  );
}
