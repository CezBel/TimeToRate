import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  business: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const businessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  address: {
    addressLocality: { type: String, required: true, },
    streetAddress: { type: String, required: true, },
    postalCode: { type: String, required: true, }
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], 
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: String,
    required: true,
    default: 0
  },
}, {
  timestamps: true
});

const Business = mongoose.model('Business', businessSchema);

export default Business;