module.exports = (req, res, next) => {
    console.log(`[Route] ${req.method} ${req.originalUrl}`);
    next();
  };
  