const qrcode = require("qrcode");
const opts = {
  errorCorrectionLevel: "H",
  scale: 50,
  type: "image/png",
};
exports.generateQR = async (username) => {
  return process.env.NODE_ENV !== "live"
    ? await qrcode.toDataURL(
        process.env.DOMAIN_NAME_LOCAL +
          process.env.CUSTOMER_PORT +
          "/" +
          username,
        opts
      )
    : await qrcode.toDataURL(
        "https://" +
          process.env.CODESPACE_NAME +
          "-" +
          process.env.CUSTOMER_PORT +
          ".githubpreview.dev/" +
          username,
        opts
      );
};
