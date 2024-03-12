import asyncHandler from '../middleware/asyncHandler.js';
import Business from '../model/businessModel.js';

// @desc    Fetch all businesses
// @route   GET /api/businesses
// @access  public
const getBusinesses = asyncHandler(async (req, res) => {
  const numOfBusinesses = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : { };

  const count = await Business.countDocuments({ ...keyword});

  const businesses = await Business.find({ ...keyword }).limit(numOfBusinesses).skip(numOfBusinesses * (page - 1));
  res.json({ businesses, page, pages: Math.ceil(count / numOfBusinesses) });
});

// @desc    Fetch single business by id
// @route   GET /api/businesses/:id
// @access  public
const getBusinessById = asyncHandler(async (req, res) => {

  const business = await Business.findById(req.params.id);
  if (business) {
    res.json(business);
  } else {
    res.status(404);
    throw new Error('Bussines not found');
  }
});

// @desc    Create business
// @route   POST /api/businesses
// @access  private Admin
const createBusiness = asyncHandler(async (req, res) => {
  const business = new Business({
    user: req.user._id,
    name: 'business',
    description: 'description',
    image: 'image',
    category: 'sample',
    sub_category: 'sample',
    address: {
      addressLocality: 'sample',
      streetAddress: 'sample',
      postalCode: 'sample',
    },
    phone: 'sample',
    email: 'sample',
    url: 'sample',
  });

  const newBusiness = await business.save();

  if (newBusiness) {
    res.status(201).json(newBusiness);
  } else {
    throw new Error('Somthing went wrong');
  }
});

// @desc    Create a new review
// @route   POST /api/businesses/:id/reviews
// @access  private
const createBusinessReview = asyncHandler(async (req, res) => {
  const { rating, comment, businessName } = req.body;

  const business = await Business.findById(req.params.id);
  if (!rating || !comment) {
    res.status(400);
    throw new Error('All fields are required');
  }

  if (business) {
    const alreadyReviewd = business.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewd) {
      res.status(400);
      throw new Error('Business already reviwed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      business: req.params.id,
      businessName: businessName
    };

    business.reviews.push(review);

    business.numReviews = business.reviews.length;

    business.rating = business.reviews.reduce((acc, review) => acc + review.rating, 0) / business.reviews.length;

    await business.save();

    res.status(201).json({ message: 'Review added ' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Fetch user reviews
// @route   GET /api/businesses/profile/myreviews
// @access  private
const getMyReviews = asyncHandler(async (req, res) => {

  const businesses = await Business.find({});

  const businessesWithReviews = businesses.filter((business) => business.reviews.length > 0);

  let reviews = [];

  businessesWithReviews.forEach((business) => {
    const userReview = business.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (userReview) {
      reviews.push(userReview);
    }
  });

  if (reviews.length > 0) {
    res.status(200).json(reviews);
  } else {
    res.status(404);
    throw new Error('You not write a reviews yet');
  }

});

// @desc    Fetch all reviews
// @route   GET /api/businesses/reviews
// @access  private Admin
const getReviews = asyncHandler(async (req, res) => {

  const businesses = await Business.find({});

  const businessesWithReviews = businesses.filter((business) => business.reviews.length > 0);

  let reviews;

  businessesWithReviews.forEach((business => {
    reviews = business.reviews;
  }));

  if (reviews) {
    res.status(200).json(reviews);
  } else {
    res.status(404);
    throw new Error('No reviews');
  }
});

// @desc    Update businesses
// @route   PUT /api/businesses/:id
// @access  private Admin
const updateBusiness = asyncHandler(async (req, res) => {
  const { name, description, image, category, sub_category, address, phone, email, url } = req.body;

  const business = await Business.findById(req.params.id);

  if (business) {
    business.name = name;
    business.description = description;
    business.image = image;
    business.category = category;
    business.sub_category = sub_category;
    business.address = address;
    business.phone = phone;
    business.email = email;
    business.url = url;

    const updatedBusiness = await business.save();
    res.json(updatedBusiness);
  } else {
    res.status(404);
    throw new Error('Resource nor found');
  }

});

// @desc    Delete business
// @route   DELETE /api/businesses/:id
// @access  private Admin
const deleteBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);

  if (business) {
    await Business.deleteOne({ _id: business._id });
    res.status(200).json({ message: 'Business deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
  
});

// @desc    Get top rated businesses
// @route   Get /api/businesses/top
// @access  public
const getTopBuisnesses = asyncHandler(async (req, res) => {
  const businesses = await Business.find().sort({ rating: -1 }).limit(4);

  res.status(200).json(businesses)
});

export { 
  getBusinesses, 
  getBusinessById, 
  createBusinessReview, 
  getMyReviews, 
  getReviews, 
  createBusiness, 
  updateBusiness, 
  deleteBusiness, 
  getTopBuisnesses 
};