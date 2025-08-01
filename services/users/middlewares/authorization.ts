async function authorization(req, reply) {
  try {
    if (req.user.role !== "admin") {
      return reply
        .code(403)
        .send({ message: "You are not authorized to perform this action" });
    }

    return true;
  } catch (error) {
    return false;
  }
}

export default authorization;
