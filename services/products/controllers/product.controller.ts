class ProductController {
  static async productList(req, reply) {
    try {
      reply.code(200).send("Hello Motto");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
