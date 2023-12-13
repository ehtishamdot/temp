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

app.get("/restaurant/all", async (req, res) => {
  try {
    const allReviews = await restaurantCollection.find({}).toArray();
    res.send(allReviews);
  } catch (err) {
    console.log(err);
  }
});

app.put("/upvote/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await restaurantCollection.findOne({
      _id: new ObjectId(id),
    });

    const result = await restaurantCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          upvote: restaurant.upvote + 1,
        },
      }
    );
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/downvote", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send("error registering up vote");
  }
});

app.put("/supervote", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send("error registering down vote");
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
