const Product = require("../models/Product");

const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

const cartController = require("./cartController");

exports.getProductsView = async (request, response) => {
  try {
    const cartCount = await cartController.getProductsCount();
    const products = await Product.getAll();

    response.render("products.ejs", {
      headTitle: "Shop - Products",
      path: "/",
      menuLinks: MENU_LINKS,
      activeLinkPath: "/products",
      products,
      cartCount,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    response.status(500).send("An error occurred");
  }
};

exports.getAddProductView = async (request, response) => {
  try {
    const cartCount = await cartController.getProductsCount();

    response.render("add-product.ejs", {
      headTitle: "Shop - Add product",
      path: "/add",
      menuLinks: MENU_LINKS,
      activeLinkPath: "/products/add",
      cartCount,
    });
  } catch (error) {
    console.error("Error rendering add product view:", error);
    response.status(500).send("An error occurred");
  }
};

exports.getNewProductView = async (request, response) => {
  try {
    const cartCount = await cartController.getProductsCount();
    const newestProduct = await Product.getLast();

    response.render("new-product.ejs", {
      headTitle: "Shop - New product",
      path: "/new",
      activeLinkPath: "/products/new",
      menuLinks: MENU_LINKS,
      newestProduct,
      cartCount,
    });
  } catch (error) {
    console.error("Error fetching newest product:", error);
    response.status(500).send("An error occurred");
  }
};

exports.getProductView = async (request, response) => {
  try {
    const cartCount = await cartController.getProductsCount();
    const name = request.params.name;
    const product = await Product.findByName(name);

    response.render("product.ejs", {
      headTitle: "Shop - Product",
      path: `/products/${name}`,
      activeLinkPath: `/products/${name}`,
      menuLinks: MENU_LINKS,
      product,
      cartCount,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    response.status(500).send("An error occurred");
  }
};

exports.deleteProduct = (request, response) => {
  const name = request.params.name;

  Product.deleteByName(name)
    .then(() => {
      response.status(STATUS_CODE.OK).json({ success: true });
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      response.status(500).json({ success: false, error: error.message });
    });
};
