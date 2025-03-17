import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  // Expect the header format to be "Bearer <token>"
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = tokenParts[1];

  try {
    // Verify token using the secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Attach user id to request for later use
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
