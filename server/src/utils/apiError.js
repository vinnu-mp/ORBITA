class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [], // Array for detailed errors (validation, etc.)
    stack = "", // Optional custom stack trace
  ) {
    // Call parent (Error) constructor → sets up message + basic error behavior
    super(message);

    // Custom properties for your API response
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      // If a custom stack is provided, use it
      this.stack = stack;
    } else {
      // Otherwise, capture a clean stack trace
      // Removes constructor call from stack (cleaner debugging)
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
