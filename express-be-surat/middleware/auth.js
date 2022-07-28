const jwt = require("jsonwebtoken");

exports.verifikasi = (roles) => {
  return function (req, rest, next) {
    // check auth header
    const tokewithBearer = req.headers.authorization;
    if (tokewithBearer) {
      const token = tokewithBearer.split(" ")[1];
      //verif
      jwt.verify(token, "lumajang", function(err, decoded) {
        if (err) {
          return rest.status(401).send({
            auth: false,
            message:
              "Sesi Telah berahir, refresh halaman ini dan ulangi kembali",
          });
        } else {
          if (roles.includes(decoded.authorize)) {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({
              auth: false,
              message: "Authorization level akses anda ditolak",
            });
          }
        }
      });
    } else {
      return rest.status(401).send({
        auth: false,
        message: "Token is required to request this operation",
      });
    }
  };
};