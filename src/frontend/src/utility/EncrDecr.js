import CryptoJS from "crypto-js";

export const encrypt = (value, type = "") => {
  if (type && typeof type == "string") {
    var key = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var iv = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  } else {
    const stringifyval = JSON.stringify(value);
    var key = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var iv = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(stringifyval.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }
};

// The get method is use for decrypt the value.
export const decrypt = (value, type = "") => {
  if (type && typeof type == "string") {
    var key = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var iv = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } else {
    var key = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var iv = CryptoJS.enc.Utf8.parse("123456$#@$^@1ERF");
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
};
