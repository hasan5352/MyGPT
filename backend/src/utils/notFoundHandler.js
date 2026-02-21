import asyncHandler from "./asyncHandler.js";

const notFoundHandler = asyncHandler((req, res) => {
  const error = Error("Page not Found");
  error.statusCode = 404;
  throw error;
});

export default notFoundHandler;
