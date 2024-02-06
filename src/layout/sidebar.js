import RestaurantResultBox from "../components/restaurant-result-box";
import "./sidebar.css";
import Map from "../components/map";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, TextField } from "@mui/material";
import RestaurantReviewCard from "../components/restaurant-box";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useRestaurant } from "../context/RestuaurantContext";
import { SnackbarProvider } from "notistack";
// import axios from "axios";

function Sidebar(props) {
  const { restaurants, fetchRestaurant, fetchPlacesData, placesData } = useRestaurant();
  useEffect(() => {
    // fetchRestaurant();
    // fetchPlacesData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.8,
    slidesToScroll: 4.8,
    centerPadding: "50px",
  };

  // console.log( fetchPlacesData, placesData)

  // const fetchRestaurant = () => {
  //   fetch("http://localhost:4000/restaurant/all")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //       let upvotes;
  //       let downvotes;
  //       let supervotes;
  //       const restaurantsData = data.map((d) => {
  //         upvotes = d.votes?.filter((d) => d.votetype === "upvote").length;
  //         downvotes = d.votes?.filter((d) => d.votetype === "downvote").length;
  //         supervotes = d.votes?.filter(
  //           (d) => d.votetype === "supervote"
  //         ).length;
  //         return {
  //           ...d,
  //           upvotes,
  //           downvotes,
  //           supervotes,
  //         };
  //       });

  //       console.log(restaurantsData)
  //       setRestaurants(restaurantsData);
  //     });
  // };
  // useEffect(() => {
  //   fetchRestaurant();
  // }, []);



  // const onSSOUberEats = () => {
  //   fetch(
  //     "https://login.uber.com/oauth/v2/authorize?client_id=Aaytalvpv2KDaXJXZl4bN46_i33Bl4T7&response_type=code&redirect_uri=http://localhost:3000/home"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  return (
    <div className="sidebar">
      {/* <TextField
        id="outlined-basic"
        label="Searach Restaurant"
        variant="outlined"
      /> */}
      <SnackbarProvider />
      <div className="restaurant-container">
        <Slider {...settings}>
          {restaurants?.map((data, index) => (
            <div key={index}>
              <RestaurantReviewCard {...(data.voting || {})} {...(data.data || {})}/>
            </div>
          ))}
        </Slider>
      </div>
      <div>
        {/* {restaurants.map((data, index)) => (
          <div></div>
        )} */}
      </div>
      {/* <div>
        {placesData?.results.map((data) => {
          return <div>
        {data.name}
          </div>
        })}
      </div> */}
    </div>
  );
}

export default Sidebar;
