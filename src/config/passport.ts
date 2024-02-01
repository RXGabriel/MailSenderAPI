import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { User } from "../model/User";

dotenv.config();

const notAuthenticatedJson = { status: 401, message: "Não autorizado." };

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const generateToken = (data: Object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string);
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
    if (user) {
      return next();
    } else {
      return res
        .status(err?.message === "No auth token" ? 401 : 403)
        .json(notAuthenticatedJson);
    }
  })(req, res, next);
};

export default passport;
