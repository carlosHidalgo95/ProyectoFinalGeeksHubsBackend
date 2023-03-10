const { isValidUserAndPassword } = require("../services/auth.services.js");
const jsonwebtoken = require("jsonwebtoken");

//COMPROBACÓN DEL TOKEN

const authBearerMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const [strategy, jwt] = authorization.split(" ");
  try {
    if (strategy.toLowerCase() !== "bearer") {
      throw new Error("Invalid strategy");
    }
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);

    const created = payload.created;

    const timeElapsed = Date.now() - created;
    const MAX_TIME = Number(process.env.MAX_TIME_JWT_CADUCITY) ||
      1000 * 60 * 60 * 24 * 30; // 30 days
    const isValid = timeElapsed && created && MAX_TIME &&
      (timeElapsed < MAX_TIME);

    if (!isValid) {
      throw new Error("Token expired");
    }

    // expose the payload to the next middlewares and controllers
    req.auth = payload;
    next();

  } catch (error) {
    res.status(401).json({ message: "You are not authenticated" });
    return;
  }

};

//COMPROBACIÓN DE ROL ADMINISTRADOR

const isValidRoleAdmin =  (req, res, next) => {
  console.log(req.auth?.role);
  if (req.auth?.role === 1) {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized" });
  }
}

module.exports = { authBearerMiddleware,isValidRoleAdmin};
