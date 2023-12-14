import { Button, Tooltip, Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./index.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import ViewRestaurant from "../drawer";
import * as React from "react";
import Drawer from "@mui/material/Drawer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RestaurantResultBox = (props) => {
  const { title, upVote, downVote, description, image } = props;
  const [upVoteCounter, setUpVoteCounter] = useState(upVote);
  const [downVoteCounter, setDownVoteCounter] = useState(downVote);
  const [modal, setModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState(null);
  const [isViewRestaurant, setIsViewRestaurant] = useState(false);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? 550 : 550 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <header style={{ minHeight: "2rem" }}>
        <div >
          <span className="vote-counter">{upVoteCounter}</span>
          <Tooltip title="Up Vote the Restaurant" onClick={onUpVoteHandler}>
            <ThumbUpIcon className="thumb" />
          </Tooltip>
          <span className="vote-counter">{downVoteCounter}</span>
          <Tooltip title="Down Vote the Restaurant" onClick={onDownVoteHandler}>
            <ThumbDownIcon className="thumb" />
          </Tooltip>
        </div>
      </header>
      <Box
        sx={{
          marginTop: "1rem",
          border: "2px solid blue",
          height: "40vh",
          overflowY: "auto",
        }}
      ></Box>
      <Box
        sx={{
          marginTop: "1rem",
          border: "2px solid blue",
          height: "45vh",
          overflowY: "auto",
        }}
      ></Box>
    </Box>
  );

  const fetchReviews = () => {
    fetch("http://localhost:4000/reviews/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const onDeleteReviewHandler = (id) => {
    fetch(`http://localhost:4000/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => fetchReviews());
  };

  const onAddNewReviewHandler = (event) => {
    setNewReview(event.target.value);
  };

  const onOpenModalHandler = () => {
    setModal(true);
  };

  const onCloseModalHandler = () => {
    setModal(false);
  };

  const onUpVoteHandler = (id) => {
    fetch(`http://localhost:4000/upvote/:id`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
  };

  const onDownVoteHandler = () => {
    setDownVoteCounter(downVoteCounter + 1);

    console.log("I am in Down vote");
  };

  const onSubmitReview = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: newReview,
      }),
    })
      .then((res) => res.json())
      .then((data) => fetchReviews());
  };

  const imageURL =
    "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYTQyMjdjZjFlNTJjYjgzZTQzZjE2ZjhjMWNlYWI2ZTAvNzkxNWM0YTc4YTlmOTRlZDU2MzE2YzdjNGRjMGVjODkuanBlZw==";

  return (
    <div onClick={toggleDrawer("left", true)} className="restaurant-result-box">
      <div className="header">
        {/* <h3>{title}</h3> */}

        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>

        <div className="voting-thumbs">
          <span className="vote-counter">{upVoteCounter}</span>
          <Tooltip title="Up Vote the Restaurant" onClick={onUpVoteHandler}>
            <ThumbUpIcon className="thumb" />
          </Tooltip>
          <span className="vote-counter">{downVoteCounter}</span>
          <Tooltip title="Down Vote the Restaurant" onClick={onDownVoteHandler}>
            <ThumbDownIcon className="thumb" />
          </Tooltip>
        </div>
        <div>
          <span className="vote-counter">{upVoteCounter}</span>
        </div>
      </div>
      {/* <ul>
        <span>4.4</span>
        <li>
          <StarIcon />
        </li>
        <li>
          <StarIcon />
        </li>
        <li>
          <StarIcon />
        </li>
      </ul> */}
      <div className="restaurant-information">
        {/* <div className="restaurant-description">
          <span>{description}</span>
        </div> */}
        <div className="restaurant-image">
          <img id="image" src={imageURL} alt="Restaurant" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      >
        <h3>{title}</h3>
        <ul>
          <span>4.4</span>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
        </ul>
      </div>
      {/* <li>
            <ul>Rating</ul>
            <ul></ul>
            <ul></ul>
            <ul></ul>
        </li>
        <p>Address</p>
        <p>Information</p>
        <li>
            <ul>Service 1</ul>
            <ul>Service 1</ul>
            <ul>Service 1</ul>
        </li> */}
      {/* <h3>Reviews</h3> */}
      {/* {reviews.map((d) => {
        return (
          <div>
            Review: <span>{d.review}</span>{" "}
            <span
              onClick={() => {
                onDeleteReviewHandler(d._id);
              }}
              style={{ color: "red", marginleft: "10px", cursor: "pointer" }}
            >
              x
            </span>
          </div>
        );
      })}
      <form onSubmit={onSubmitReview}>
        <input onChange={onAddNewReviewHandler} placeholder="reivew.." />
        <button type="submit">Submit</button>
      </form> */}
      {/* <Button
        onClick={onOpenModalHandler}
        style={{ textAlign: "left" }}
        variant="contained"
      >
        Super Eat
      </Button> */}
      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <h3>{title}</h3>
          </Box>
          <Button
            onClick={onCloseModalHandler}
            style={{ textAlign: "left" }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RestaurantResultBox;
