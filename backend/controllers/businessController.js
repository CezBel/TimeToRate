import asyncHandler from '../middleware/asyncHandler.js';
import Business from '../model/businessModel.js';

// @desc    Fetch all businesses
// @route   GET /api/businesses
// @access  public
const getBusinesses = asyncHandler(async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
});

// @desc    Fetch single business by id
// @route   GET /api/businesses/:id
// @access  public
const getBusinessById = asyncHandler(async (req, res) => {

  const business = await Business.findById(req.params.id);
  if (business) {
    return res.json(business);
  } else {
    res.status(404);
    throw new Error('Bussines not found');
  }
});

export { getBusinesses, getBusinessById };