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


export default function ViewRestaurant({ placeId }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [details, setDetails] = React.useState(null)
  const [value, setValue] = React.useState('gallery');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const toggleDrawer = (anchor, open, placeId) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data?.result)
      })

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 550 : 550 }}
      role="presentation"
    >
      {details && (
        <div>
          <h2>{details.name}</h2>
          <p>{details.formatted_address}</p>
          <p>Rating: {details.rating}</p>
          <p>Phone: {details.formatted_phone_number}</p>

          {/* Add Tabs for Gallery, Reviews, and Menu */}
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Gallery" value="gallery">
            </Tab>
            <Tab label="Reviews" value="reviews">
              {/* Display reviews here */}

            </Tab>
            <Tab label="Menu" value="menu">
              {/* Display menu items here */}
              {/* You can fetch menu details from the API response and display them */}
            </Tab>
          </Tabs>

          {value === "gallery" && <Box>
            {/* {details.photos && details.photos.map((photo, index) => (
              <img key={index} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE`} alt={`Gallery ${index}`} />
            ))} */}
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
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
          </Box>}

          {value === "reviews" && <Box>
            {details.reviews && details.reviews.map((review, index) => (
              <div key={index}>
                <h3>{review.author_name}</h3>
                <p>{review.text}</p>
              </div>
            ))}
          </Box>}

          {value === "menu" && <Box>
            {details.reviews && details.reviews.map((review, index) => (
              <div key={index}>
                <h3>{review.author_name}</h3>
                <p>{review.text}</p>
              </div>
            ))}
          </Box>}
        </div>
      )}
    </Box>
  );


  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true, placeId)}>View Restaurant</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
