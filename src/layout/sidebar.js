import RestaurantResultBox from "../components/restaurant-result-box";
import "./sidebar.css";
import Map from "../components/map";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, TextField } from "@mui/material";
import RestaurantReviewCard from "../components/restaurant-box";

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
        "https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/PanelImages/General/156757283_Bedford_Hotel__F_B__Botanica_Restaurant_and_Bar__General_View._4500x3000.jpg",
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

  return (
    <div className="sidebar">
      {/* <TextField
        id="outlined-basic"
        label="Searach Restaurant"
        variant="outlined"
      /> */}

      <div  className="restaurant-container">
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <h3>Results</h3>
          <Tooltip title="loream ">
            <InfoIcon
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </div> */}
        {dummyData.map((data) => (
          <RestaurantReviewCard {...data} />
        ))}
      </div>
      <Map />
    </div>
  );
}

export default Sidebar;
