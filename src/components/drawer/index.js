// Import necessary components and icons from Material-UI
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { IconButton, Tooltip, Typography, styled } from '@mui/material';
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Functional component ViewRestaurant takes a placeId as a prop
export default function ViewRestaurant({ placeId }) {
  // State to manage the opening and closing of the drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // State to store details of the restaurant fetched from Google Maps API
  const [details, setDetails] = React.useState(null);

  // State to manage the currently selected tab value (gallery, reviews, menu)
  const [value, setValue] = React.useState('gallery');

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to toggle the drawer's visibility
  const toggleDrawer = (anchor, open, placeId) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    const fetchData = async (placeId) => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
          params: {
            place_id: placeId,
            key: 'AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE',
          },
        });
    
        const data = response.data;
        console.log(data);
        setDetails(data?.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(placeId);
    // Fetch details of the restaurant using the provided placeId from Google Maps API
    // fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setDetails(data?.result);
    //   });

    // Set the state to open/close the drawer
    setState({ ...state, [anchor]: open });
  };

  const MenuItem = styled(Box)({
    display: "flex",
    padding: "10px",
    ".imageWrapper": {
      width:"200px"
    },
    ".menuContent": {
      flexGrow: "1",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: "2rem 0",

      ".menuHeading": {
        color: "rgb(33, 37, 41)",
        fontSize: "28px",
        fontWeight: '600'
      },
      ".menuDescription": {
        color: "rgb(113, 128, 150)",
        fontSize: "18px",
        fontWeight: '400'
      },
      ".pricing": {
        backgroundColor: "#000",
        color: "white",
        display:"inline",
        padding: "0 5px",
        "span": {
          textDecoration:"line-through"
        }
      }
    },
  });
  // JSX for the content of the drawer
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 575 : 575, padding: "30px 16px 0" }}
      role="presentation"
    >
      <Box sx={{position:"absolute", right: "10px", top: "10px"}}>
       <Button onClick={toggleDrawer(anchor, false)}><img src='/Images/close-btn.jpg' width="40px"/></Button>
      </Box>
      {details && (
        <div>
          {/* Display basic details of the restaurant */}
          <h2>{details.name}</h2>
          <p>{details.formatted_address}</p>
          <p>Rating: {details.rating}</p>
          <p>Phone: {details.formatted_phone_number}</p>

          {/* Add Tabs for Gallery, Reviews, and Menu */}
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Gallery" value="gallery"></Tab>
            <Tab label="Reviews" value="reviews">
              {/* Display reviews here */}
            </Tab>
            <Tab label="Menu" value="menu">
              {/* Display menu items here */}
              {/* You can fetch menu details from the API response and display them */}
            </Tab>
          </Tabs>

          {/* Conditional rendering based on the selected tab */}
          {value === "gallery" && (
            <Box>
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {/* Display restaurant gallery using Google Maps photo API */}
                {details.photos && details.photos.map((photo, index) => (
                  <ImageListItem key={photo.photo_reference}>
                    <img
                      srcSet={`${`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`}`}
                      alt={`Gallery ${index}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}

          {value === "reviews" && (
            <Box sx={{marginTop: "1rem"}}>
              {/* Display restaurant reviews */}
              {details.reviews && details.reviews.map((review, index) => (
                <div key={index}>
                  <h3>{review.author_name}</h3>
                  <p>{review.text}</p>
                </div>
              ))}
            </Box>
          )}

          {value === "menu" && (
            <>
            <Box>
            <MenuItem>
              <Box className="imageWrapper">
                <img src='/Images/burger1.webp' width="100%" alt='burgerImage'/>
              </Box>
              <Box className="menuContent">
                <Box>
                <Typography className='menuHeading'>Wow Winter Deal 1</Typography>
                <Typography className='menuDescription'>1 Firebird burger with 1 soft drink</Typography>
                </Box>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"between", gap:"1rem"}}>
                  <Typography className="pricing"><span>Rs. 928</span> Rs. 900</Typography>
                  {/* <Box sx={{display:"flex",justifyContent:"center",gap:"8px",alignItems:"center"}}><Button sx={{transform:"scaleY(-1)"}}><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography><Button><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography></Box> */}
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
              // onClick={() => {
              //   onUpVoteHandler(reference);
              // }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
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
            >
              <HeartBrokenIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
        </div>
                </Box>
              </Box>
            </MenuItem>
            </Box>
            <MenuItem>
              <Box className="imageWrapper">
                <img src='/Images/burger2.webp' width="100%" alt='burgerImage'/>
              </Box>
              <Box className="menuContent">
                <Box>
                <Typography className='menuHeading'>Wow Winter Deal 2</Typography>
                <Typography className='menuDescription'>1 Premium burger with 1 soft drink</Typography>
                </Box>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"between", gap:"1rem"}}>
                  <Typography className="pricing"><span>Rs. 928</span> Rs. 900</Typography>
                  {/* <Box sx={{display:"flex",justifyContent:"center",gap:"8px",alignItems:"center"}}><Button sx={{transform:"scaleY(-1)"}}><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography><Button><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography></Box> */}
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
              // onClick={() => {
              //   onUpVoteHandler(reference);
              // }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
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
            >
              <HeartBrokenIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
        </div>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box className="imageWrapper">
                <img src='/Images/burger3.webp' width="100%" alt='burgerImage'/>
              </Box>
              <Box className="menuContent">
                <Box>
                <Typography className='menuHeading'>Wow Winter Deal 3</Typography>
                <Typography className='menuDescription'>1 Gignatic burger with 1 soft drink</Typography>
                </Box>
                {/* <Box>
                  <Typography className="pricing"><span>Rs. 1128</span> Rs. 999</Typography>
                </Box> */}
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"between", gap:"1rem"}}>
                  <Typography className="pricing"><span>Rs. 928</span> Rs. 900</Typography>
                  {/* <Box sx={{display:"flex",justifyContent:"center",gap:"8px",alignItems:"center"}}><Button sx={{transform:"scaleY(-1)"}}><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography><Button><img src='/Images/arrowUp.png' width={30}/></Button><Typography fontWeight={600} fontSize={20}>0</Typography></Box> */}
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
              // onClick={() => {
              //   onUpVoteHandler(reference);
              // }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
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
            >
              <HeartBrokenIcon />
            </IconButton>
          </Tooltip>
          <span style={{ paddingRight: "10px" }}>0</span>
        </div>
                </Box>
              </Box>
            </MenuItem>
            </>
          )}
        </div>
      )}
    </Box>
  );

  // JSX for the main component
  return (
    <div>
      {/* Iterate over the specified anchor positions (only 'right' in this case) */}
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* Button to open the drawer */}
          <Button onClick={toggleDrawer(anchor, true, placeId)}>View Restaurant</Button>
          {/* Drawer component */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* Content of the drawer */}
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
