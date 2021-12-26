const Cart = require("../model/cartModel");

exports.getCart = (req, res) => {
  Cart.find({ user: req.user._id })
    .populate("product")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "No cart found",
        });
      }
      res.json(cart);
    });
};

exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id, product: req.body.product }).exec((err, cart) => {
    if (err) {
      return res.status(400).json({
        error: "No cart found",
      });
    }
    if (cart) {
      cart.quantity = cart.quantity + 1;
      cart.save();
      return res.json(cart);
    }
    const newCart = new Cart({
      user: req.user._id,
      ...req.body,
    });
    newCart.save((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to add to cart" + err,
        });
      }
      res.json({ message: "Added to cart" });
    });
  });
};
