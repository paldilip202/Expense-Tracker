const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    const err = new Error("Token not found");
    return next(err); // Pass error to error-handling middleware
  }

  //! Verify the token
  const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET); // Return decoded payload
    } catch (err) {
      throw new Error("Invalid or expired token"); // Throw error for invalid/expired tokens
    }
  };

  try {
    const decoded = verifyToken(token); // Call the function with the token
    req.user = decoded.id; // Save the user ID in the request object
    next(); // Proceed to the next middleware/route
  } catch (err) {
    next(err); // Pass error to error-handling middleware
  }
};

module.exports = isAuthenticated;