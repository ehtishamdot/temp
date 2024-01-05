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

    // Fetch details of the restaurant using the provided placeId from Google Maps API
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data?.result);
      });

    // Set the state to open/close the drawer
    setState({ ...state, [anchor]: open });
  };

  // JSX for the content of the drawer
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 550 : 550 }}
      role="presentation"
    >
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
            <Box>
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
            <Box>
              {/* Display restaurant menu (Assuming menu information is available in reviews) */}
              {details.reviews && details.reviews.map((review, index) => (
                <div key={index}>
                  <h3>{review.author_name}</h3>
                  <p>{review.text}</p>
                </div>
              ))}
            </Box>
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
