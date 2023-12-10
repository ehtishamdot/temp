import RestaurantResultBox from "../components/restaurant-result-box";
import "./sidebar.css";
import Map from "../components/map";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, TextField } from "@mui/material";
import RestaurantReviewCard from "../components/restaurant-box";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Sidebar() {
  const dummyData = [


    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/PanelImages/General/156757283_Bedford_Hotel__F_B__Botanica_Restaurant_and_Bar__General_View._4500x3000.jpg",
    },
    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://assets.architecturaldigest.in/photos/61db1eed472e5c4d0d4c8dd8/3:2/w_5973,h_3982,c_limit/Main%20seating%20area%20Ekaa.jpg",
    },
    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://media.gq-magazine.co.uk/photos/64e753b56f674d63190d0a8d/16:9/w_2560%2Cc_limit/Photo%2520Credit-%2520Rebecca%2520Dickson%2520(2).jpg",
    },
    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://i0.wp.com/edera.co.uk/wp-content/uploads/2016/04/ux163481_942long.jpg?resize=942%2C530&ssl=1",
    },
    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/27/9f/45/bc/restaurant.jpg",
    },
    {
      id: 1,
      title: "Name",
      downVote: 3,
      upVote: 10,
      description: "Lorem",
      image:
        "https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/PanelImages/General/156757283_Bedford_Hotel__F_B__Botanica_Restaurant_and_Bar__General_View._4500x3000.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.8,
    slidesToScroll: 4.8,
    centerPadding: "50px",
  };

  return (
    <div className="sidebar">
      {/* <TextField
        id="outlined-basic"
        label="Searach Restaurant"
        variant="outlined"
      /> */}


      <div className="restaurant-container">
        <Slider {...settings}>
          {dummyData.map((data, index) => (
            <div key={index}>
              <RestaurantReviewCard {...data} />
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
}

export default Sidebar;
