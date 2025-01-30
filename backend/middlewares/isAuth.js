const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  //! Verify the token
  const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;  // If the token is valid, return the decoded payload.
    } catch (err) {
      return false;  // If there's an error (invalid token, expired, etc.), return false.
    }
  };

  const decoded = verifyToken(token); // Call the function with the token

  if (decoded) {
    //! Save the user data in the request object
    req.user = decoded.id;  // Assuming the decoded token contains 'id' field
    next();
  } else {
    const err = new Error("Token expired, login again");
    next(err);
  }
};

module.exports = isAuthenticated;
