const qrcode = require("qrcode");
const opts = {
  errorCorrectionLevel: "H",
  scale: 50,
  type: "image/png",
};
const qrURL =
  process.env.NODE_ENV === "live"
    ? "https://" +
      process.env.CODESPACE_NAME +
      "-" +
      process.env.CUSTOMER_PORT +
      ".githubpreview.dev/"
    : process.env.DOMAIN_NAME_LOCAL + process.env.CUSTOMER_PORT + "/";

exports.generateQR = async (username) => {
  return await qrcode.toDataURL(qrURL + username, opts);
};
