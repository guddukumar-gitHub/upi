const globalErrorHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // mongoose validation error
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = error.message;
  }

  // mongoose duplicate error
  else if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
  }

  // jwt error
  else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // zod error
  else if (error.name === "ZodError") {
    statusCode = 400;
    message = error.errors;
  }

  // custom/default
  else if (error.message) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;