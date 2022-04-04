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
    fileSize: 15000000, // 15 mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/))
      return cb(
        new Error("This is not a correct format of the file only use PDF")
      );
    cb(undefined, true);
  },
});
exports.logo = multer({
  limits: {
    fileSize: 1500000, //1.5 mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error("This is not a correct format of the file, use jpg, png only")
      );
    cb(undefined, true);
  },
});
