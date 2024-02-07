import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Tooltip } from "@mui/material";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import MessageModal from "../message-modal";
import ViewRestaurant from "../drawer";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { useUserAuth } from "../../context/UserAuthContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from "react-hot-toast";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RestaurantReviewCard(props) {
  const {
    reference,
    title,
    upvotes,
    downvotes,
    description,
    photos,
    place_id: placeId,
    geometry,
    // currentLocation,
  } = props;

  const {user} = useUserAuth();
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes_, setUpvotes_] = React.useState(upvotes);
  const [downvotes_, setDownvotes_] = React.useState(downvotes);
  const [openMessageModal, setOpenMessageModal] = React.useState(false);
  const [isViewRestaurant, setIsViewRestaurant] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState();

  React.useEffect(() => {
    // Check if Geolocation is supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  // console.log(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0]?.photo_reference}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`)

  // console.log("geometry",geometry);
  const handleOpenMessageModal = () => {
    setOpenMessageModal(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isWithin1000Meters = (source, destination) => {
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Distance in meters
      console.log(distance);
      return distance;
    };

    const { lat: lat1, lng: lon1 } = source;
    const { lat: lat2, lng: lon2 } = destination;

    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    return distance < 1000;
  };

  const onUpVoteHandler = (id) => {
    const status = isWithin1000Meters(currentLocation, geometry.location);
    console.log(status);
    if (!status) {
      console.log("Unable to Like");
      enqueueSnackbar("This is out of the current radius!", {
        variant: "error",
      });
      return;
    }

    fetch(`http://localhost:4000/upvote/${id}/${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpvotes_(data.data.upvotes);
        setDownvotes_(data.data.downvotes);
      })
      .catch((error) => {
        console.error("Error during upvote:", error);
      });
  };

  const onDownVoteHandler = (id) => {
    const status = isWithin1000Meters(currentLocation, geometry.location);
    if (!status) {
      enqueueSnackbar("This is out of the current radius", {
        variant: "error",
      });

      return;
    }
    fetch(`http://localhost:4000/downvote/${id}/${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpvotes_(data.data.upvotes);
        setDownvotes_(data.data.downvotes);
      })
      .catch((error) => {
        console.error("Error during downvote:", error);
      });
  };


  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        margin: "0 1rem",
        boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      }}
    >
      {/* <SnackbarProvider /> */}
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Ru
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <ViewRestaurant placeId={placeId} />
      <MessageModal open={openMessageModal} setOpen={setOpenMessageModal} />
      {photos ?
        (
          <CardMedia
            component="img"
            height="194"
            image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0]?.photo_reference}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`}
            alt="Paella dish"
          />
        ) : (
          <CardMedia
          component="img"
          height="194"
          image={`/resturantImage.png`}
          alt="Paella dish"
          sx={{objectFit: "contain"}}
        />
        )}

      <CardContent
        sx={{ padding: "0", paddingLeft: "16px", paddingTop: "10px" }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            textAlign: "left",
          }}
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="Up Vote">
            <IconButton
              onClick={() => {
                onUpVoteHandler(reference);
              }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>{upvotes_?.length}</span>
          <span
            style={{
              height: "22px",
              background: "rgb(207 202 202)",
              width: "2px",
              display: "inline-block",
            }}
          ></span>
          <Tooltip title="Down Vote">
            <IconButton
              onClick={() => {
                onDownVoteHandler(reference);
              }}
              aria-label="add to favorites"
            >
              <HeartBrokenIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>{downvotes_?.length}</span>
        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <Tooltip title="Super Vote">
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <LocalFireDepartmentTwoToneIcon onClick={handleOpenMessageModal} />
          </ExpandMore>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
