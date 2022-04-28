"use strict";
exports.isObjID = (req, res, next) => { 
    const orderid = (/^(\s.*\)*[a-fA-F0-9]{24,24}$/); // for order id
}