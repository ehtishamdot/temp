const express = require("express");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Restaurant = require("./models/restaurant.js");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const { MongoClient, ObjectId } = require("mongodb");

const mongodbURL =
  "mongodb+srv://mo:1234@cluster0.z1buduh.mongodb.net/restaurant";
const dbName = "restaurant";

const client = new MongoClient(mongodbURL);
const db = client.db(dbName);
const restaurantCollection = db.collection("restaurants");
const reviewsCollection = db.collection("reviews");
const userCollection = db.collection("users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 4000;

app.get("/restaurants/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body;
});

app.get("/reviews/all", async (req, res) => {
  try {
    const allReviews = await reviewsCollection.find({}).toArray();
    res.send(allReviews);
  } catch (err) {
    console.log(err);
  }
});

app.get("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const review = await reviewsCollection.findOne({
      _id: new ObjectId(id),
    });
    res.send(review);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await reviewsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

app.post("/review", (req, res) => {
  console.log(req.body);
  reviewsCollection.insertOne(req.body, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(result);
  });
  res.send(req.body);
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userCollection.findOne({ username });

    if (user) {
      return res.status(404).send("user is already exist");
    }

    // const user = new User({ username, password: hashedPassword });
    // await user.save();

    userCollection.insertOne(
      { username, password: hashedPassword },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
      }
    );

    res.status(201).send("user is registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user.");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username });

    if (!user) {
      return res.status(404).send("user not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    res.status(200).json({ username });
    console.log(user);
  } catch (err) {
    res.status(500).send("error loggin in");
  }
});

app.post("/restaurant", async (req, res) => {
  try {
    console.log(req.body);
    restaurantCollection.insertOne(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
    });
    res.send(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Define a route for retrieving restaurant information based on latitude and longitude
app.get("/restaurant/all/:lat/:lng", async (req, res) => {
  try {
    // Google Maps API Key for authentication
    const apiKey = "AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE";

    // Extract latitude and longitude from request parameters
    const latitude = req.params.lat;
    const longitude = req.params.lng;

    // Construct the Google Places API URL for nearby restaurants
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${apiKey}`;

    // Fetch restaurant data from the Google Places API
    const response = await fetch(apiUrl);
    const fetchedRestaurants = await response.json();

    // Retrieve all existing restaurant votes from the database
    const allRestaurantsVotes = await restaurantCollection.find({}).toArray();

    // Process each fetched restaurant, insert new ones into the database, and prepare response data
    const restaurantsData = await Promise.all(fetchedRestaurants?.results?.map(async (data) => {
      // Check if the restaurant already exists in the database based on reference
      const existingRestaurant = allRestaurantsVotes.find(
        (v) => data.reference === v.reference
      );

      // If the restaurant doesn't exist, insert a new record into the database
      if (!existingRestaurant) {
        try {
          // Insert a new restaurant record with initial vote counts
          const result = await restaurantCollection.insertOne({
            reference: data.reference,
            upvotes: [],
            downvotes: [],
            supervotes: [],
          });

          // Log the successful insertion
          console.log("New restaurant inserted:", result);

          // Retrieve the newly inserted restaurant data from the database
          const newRes = await restaurantCollection.findOne(({
            _id: result.insertedId,
          }));

          // Return an object containing both voting information and the original restaurant data
          return {
            voting: newRes,
            data,
          };
        } catch (err) {
          // Log and handle errors during the insertion process
          console.error("Error inserting new restaurant:", err);

          // Return an object with null voting information and the original restaurant data
          return {
            voting: null,
            data,
          };
        }
      }

      // If the restaurant already exists, return an object with voting information and the original restaurant data
      return {
        voting: existingRestaurant,
        data,
      };
    }));

    // Send the response containing information about each restaurant and its voting status
    res.json(restaurantsData);

  } catch (err) {
    // Log and handle errors that occur during the entire process
    console.log(err);
  }
});


app.put("/upvote/:id/:email", async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;

  try {
    // Find the restaurant document
    const restaurant = await restaurantCollection.findOne({ reference: id });

    if (!restaurant) {
      // If the restaurant with the given reference ID is not found, return an error response
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // Check if the email exists in the downvotes array
    if (restaurant.downvotes.includes(email)) {
      // Remove the email from the downvotes array
      await restaurantCollection.updateOne(
        { reference: id },
        { $pull: { downvotes: email } }
      );

      // Push the email into the upvotes array
      await restaurantCollection.updateOne(
        { reference: id },
        { $push: { upvotes: email } }
      );

    } else {
      // If the email is not in the downvotes array, return an error response
      // Push the email into the upvotes array
      await restaurantCollection.updateOne(
        { reference: id },
        { $push: { upvotes: email } }
      );

    }

    const newRes = await restaurantCollection.findOne(({
      reference: id,
    }));

    res.json({ success: true, message: "upvoted", data: newRes });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


app.put("/downvote/:id/:email", async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;

  try {
    // Find the restaurant document
    const restaurant = await restaurantCollection.findOne({ reference: id });

    if (!restaurant) {
      // If the restaurant with the given reference ID is not found, return an error response
      return res.status(404).json({ error: "Restaurant not found." });
    }

    // Check if the email exists in the downvotes array
    if (restaurant.upvotes.includes(email)) {
      // Remove the email from the downvotes array
      let result = await restaurantCollection.updateOne(
        { reference: id },
        { $pull: { upvotes: email } }
      );

      // Push the email into the upvotes array
      result = await restaurantCollection.updateOne(
        { reference: id },
        { $push: { downvotes: email } }
      );

    } else {
      // If the email is not in the downvotes array, return an error response
      // Push the email into the upvotes array
      let result = await restaurantCollection.updateOne(
        { reference: id },
        { $push: { downvotes: email } }
      );
    }

    const newRes = await restaurantCollection.findOne(({
      reference: id,
    }));

    res.json({ success: true, message: "downvoted", data: newRes });

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



app.put("/supervote/:id/:email", async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  try {
    const restaurant = await restaurantCollection.findOne({
      _id: new ObjectId(id),
    });

    console.log(restaurant);

    const result = await restaurantCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          votes: [
            ...restaurant.votes,
            {
              email,
              votetype: "supervote",
            },
          ],
        },
      }
    );
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server runnign at http://localhost:${PORT}`);
  client.connect((err) => {
    console.log("Mongodb is connected");

    console.log(err);
    if (err) {
      return;
    }
    client.close();
  });
});
