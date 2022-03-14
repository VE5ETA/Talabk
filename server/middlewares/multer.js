const multer = require("multer");

exports.LimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.statusCode = 413;
    res.send(err);
  } else {
    next();
  }
};

exports.pdf = multer({
  limits: {
    fileSize: 15000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});
