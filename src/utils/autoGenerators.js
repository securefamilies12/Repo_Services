const crypto = require("crypto");
const fs = require("fs");
const privateKey = crypto.createPrivateKey(
  fs.readFileSync(__dirname + "/keys/private.pem")
);

const publicKey = fs.readFileSync(__dirname + "/keys/public.pem");

// const publicKeyObj = crypto.createPublicKey({
//   key: publicKey,
//   format: 'pem',
//   type: 'spki'
// });

// crypto-js

export function generateRandomHex(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export const dataDecription = async (encrpteddata) => {
  try {
    const encryptedData = new Buffer.from(encrpteddata, "base64");

    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      encryptedData
    );

    return decryptedData.toString();
  } catch (error) {
    return "error";
  }
};

// export function encryptWithPublicKey(text) {
//   return crypto.publicEncrypt(publicKeyObj, Buffer.from(text)).toString("base64");
// }
