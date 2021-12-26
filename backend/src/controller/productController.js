const Product = require("../model/productModel");

exports.getAllProducts = (req, res) => {
  // ! ADD THIS TO FIND FUNCTION { status: "approved" }
  Product.find()
    .skip((req.query.page - 1) * 20 || 0)
    .limit(20)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Fetching products failed!" + err,
      });
    });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send({ message: "Product not found!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Fetching product failed!" + err,
      });
    });
};

exports.createProduct = (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "seller") {
    return res.status(401).send({
      message: "You are not authorized to create a product!",
    });
  }
  const product = new Product({
    image: req.file.filename,
    seller: req.user._id,
    ...req.body,
  });

  if (req.user.role === "admin") {
    product.status = "approved";
  }

  product
    .save()
    .then((createdProduct) => {
      res.status(201).send({
        message: "Product added successfully!",
        product: {
          ...createdProduct,
          id: createdProduct._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Creating product failed!" + err,
      });
    });
};
