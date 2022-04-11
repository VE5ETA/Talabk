const qrcode = require("qrcode");
const opts = {
  errorCorrectionLevel: "H",
  scale: 50,
  type: "image/png",
};
exports.generateQR = async (username) => {
  return await qrcode.toDataURL("http://127.0.0.1:8081/@" + username, opts);
};
