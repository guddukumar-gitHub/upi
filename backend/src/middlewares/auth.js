import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // get authorization header
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // token format: Bearer asdasdadasd
    const token = authorizationToken.split(" ")[1];

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // attach decoded user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;