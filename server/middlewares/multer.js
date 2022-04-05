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
    fileSize: 12000000, // used to be {15 mb} // updated limit to 12 because base64 increase size by ~33% total size will be 133%.
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
    fileSize: 1500000, //1.5 mb // increased by 133% so it will be 2 mb after encoding with base64
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error("This is not a correct format of the file, use jpg, png only")
      );
    cb(undefined, true);
  },
});
