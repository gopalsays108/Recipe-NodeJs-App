require("dotenv").config();
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const { find: findUser } = require("../services/user");

const JWT_SECRET  = "##%%MyS3cr3tK3Y%%##";
console.log("JWT_SECRET: here", JWT_SECRET);

const strategy = new Strategy(
  
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await findUser({ id: jwtPayload.id });

      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  initialize,
  authenticate,
};