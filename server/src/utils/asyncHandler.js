const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("Async Error:", err.message);
    console.error(err.stack);
    next(err);
  });

export { asyncHandler };
