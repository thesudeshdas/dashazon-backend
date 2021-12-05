const Wishlist = require('../models/wishlist.model');
const User = require('../models/user.model');

exports.wishlist_list_get = async (req, res) => {
  try {
    const wishlist = await Wishlist.find();

    res.status(200).json({
      title: 'Wishlist',
      success: true,
      message: 'Fetching wishlist was successful.',
      wishlist,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Wishlist',
      success: false,
      message: 'Uh Oh :( Wishlists could not be fetched. ' + err.message,
    });
  }
};

exports.wishlist_add_post = async (req, res) => {
  try {
    const newWishlist = new Wishlist(req.body);
    const addedWishlist = await newWishlist.save();

    res.status(200).json({
      title: 'New Wishlist',
      success: true,
      message: 'New Wishlist was created successfully.',
      newWishlist,
    });
  } catch (err) {
    res.status(500).json({
      title: 'New Wishlist',
      success: false,
      message: 'Error while creating new wishlist. ' + err.message,
    });
  }
};

exports.wishlist_find_user_param = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (user) {
      const userWishlist = await Wishlist.findOne({ owner: user._id })
        .populate('productsList.product')
        .populate('owner');

      if (!userWishlist) {
        return res.status(404).json({
          title: 'Find User Wishlist',
          success: false,
          message: 'No wishlist for this user id.',
        });
      }

      req.user = user;
      req.userWishlist = userWishlist;
      next();
    }
  } catch (err) {
    res.status(500).json({
      title: 'Find User Wishlist',
      success: false,
      message: 'Error while retrieving user wishlist. ' + err.message,
    });
  }
};

exports.wishlist_details_user_get = async (req, res) => {
  let { userWishlist } = req;

  res.status(200).json({
    title: 'User Wishlist',
    success: true,
    message: 'User wishlist is here.',
    wishlist: userWishlist,
  });
};

exports.wishlist_add_product_post = async (req, res) => {
  const { productId } = req.body;
  const { userWishlist } = req;

  try {
    const product = userWishlist.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      const updatedproductsList = [
        ...userWishlist.productsList,
        {
          product: productId,
        },
      ];

      userWishlist.productsList = updatedproductsList;

      const updatedUserWishlist = await userWishlist.save();

      res.status(200).json({
        title: 'Add product to wishlist',
        success: true,
        message: 'The product was added to wishlist',
      });
    }

    res.status(409).json({
      title: 'Add product to wishlist',
      success: false,
      message: 'The product already exists in wishlist',
    });
  } catch (err) {
    res.status(500).json({
      title: 'Add Product to Wishlist',
      success: false,
      message: 'Error while adding product to wishlist. ' + err.message,
    });
  }
};

exports.wishlist_remove_product_post = async (req, res) => {
  const { productId } = req.body;
  const { userWishlist } = req;

  try {
    const product = userWishlist.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      res.status(409).json({
        title: 'Remove product from wishlist',
        success: false,
        message: 'The product does not exist in wishlist',
      });
    }

    const updatedProductsList = userWishlist.productsList.filter(
      (item) => item.product._id != productId
    );

    userWishlist.productsList = updatedProductsList;

    const updatedUserWishlist = await userWishlist.save();

    res.status(200).json({
      title: 'Remove product from wishlist',
      success: true,
      message: 'The product was removed from wishlist',
      removedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Remove product from wishlist',
      success: false,
      message: 'Error while removing product from wishlist. ' + err.message,
    });
  }
};
