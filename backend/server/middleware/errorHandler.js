export function errorHandler(error, request, response, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (response.headersSent) {
    return next(error);
  }

  return response.status(error.status || 500).json({
    message: error.message || 'Server error.'
  });
}
