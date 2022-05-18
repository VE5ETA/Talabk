const multer = require("multer");

exports.LimitErrorHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(413).send({
      message: err.message,
      success: false,
    });
  } else if (err) {
    res.status(415).send({
      message: err.message,
      success: false,
    });
  } else {
    next();
  }
};

exports.pdf = multer({
  limits: {
    fileSize: 15400000, //this was a missunderstanding the comment after this is wrong 👎😐 ====>  // used to be {15 mb} // updated limit to 12 because base64 increase size by ~33% total size will be 133%.
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/))
      return cb(
        new Error("This is not a correct format of the file, PDF only!")
      );
    cb(undefined, true);
  },
});
exports.logo = multer({
  limits: {
    files: 1,
    fileSize: 1540000, //1.5 mb // increased by 133% so it will be 2 mb after encoding with base64
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error(
          "This is not a correct format of the file, use jpg, jpeg, png only"
        )
      );
    cb(undefined, true);
  },
});
exports.item = multer({
  limits: {
    files: 1,
    fileSize: 540000, //this needs to be update 😲 => //0.12 mb == 120KB // ignore the comment after this // increased by 133% so it will be ~0.7 mb after encoding with base64
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(
        new Error(
          "This is not a correct format of the file, use jpg, jpeg, png only"
        )
      );
    cb(undefined, true);
  },
});
