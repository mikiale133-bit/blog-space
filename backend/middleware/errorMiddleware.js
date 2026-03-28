export const errHanler = (err, req, res, next) => {
  // custom error handler
  console.log(err);
  res.status(500).json({ message: err.message });
};
