const ProductController = require("../controllers/product.controller.ts");

async function routes(fastify, options) {
  fastify.get("/api/product/lists", ProductController.productList);
}

module.exports = routes;
