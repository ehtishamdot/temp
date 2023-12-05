const mongoose = require("mongoose");

const restaurantSChema = new mongoose.Schema({
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    defeault: 0,
  },
  restaurantForeignId: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
  },
  supervotes: {
    type: Number,
    default: 0,
  },
});



const Restaurant = mongoose.model("Restaurant", restaurantSChema);

module.exports = Restaurant