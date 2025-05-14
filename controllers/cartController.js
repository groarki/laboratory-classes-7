const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  const productData = request.body;

  Product.add(productData)
    .then(() => {
      return Cart.add(productData.name);
    })
    .then(() => {
      response.status(STATUS_CODE.FOUND).redirect("/products/new");
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      response.status(500).send("An error occurred");
    });
};

exports.getProductsCount = async () => {
  try {
    return await Cart.getProductsQuantity();
  } catch (error) {
    console.error("Error getting product count:", error);
    return 0;
  }
};
