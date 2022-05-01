"use strict";
exports.isValidObjID = (req, res, next) => {
  try {
    if (req.body.ID.match(/^[0-9a-fA-F]{24}$/)) {
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).send({
      message: error && "not valid Object ID", // the && will send the value if the error was null
      success: false,
    });
  }
};
