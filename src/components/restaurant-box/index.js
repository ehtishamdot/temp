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
  const { _id, title, upvotes, downvotes, description, image } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes_, setUpvotes_] = React.useState(Number(upvotes));
  const [downvotes_, setDownvotes_] = React.useState(Number(downvotes));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onUpVoteHandler = (id) => {
    fetch(`http://localhost:4000/upvote/${id}/imasud7865@gmail.com`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUpvotes_(upvotes_ + 1));
  };

  const onDownVoteHandler = (id) => {
    fetch(`http://localhost:4000/downvote/${id}/imasud7865@gmail.com`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDownvotes_(downvotes_ + 1));
  };

  
  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
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
                onUpVoteHandler(_id);
              }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>{upvotes_}</span>
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
                onDownVoteHandler(_id);
              }}
              aria-label="add to favorites">
              <HeartBrokenIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>{downvotes_}</span>
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
            <LocalFireDepartmentTwoToneIcon />
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
