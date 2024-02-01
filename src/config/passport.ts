import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "../model/User";

interface CustomError extends Error {
  status?: number;
}

const notAuthorizedJson = { status: 401, message: "Not authorized" };

passport.use(
  new BasicStrategy(async (email, password, done) => {
    try {
      if (email && password) {
        const user = await User.findOne({
          where: { email, password },
        });
        if (user) {
          return done(null, user);
        }
      }
      throw new Error("Not authorized");
    } catch (error) {
      return done(error as CustomError, false);
    }
  })
);

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "basic",
    { session: false },
    (err: CustomError, user: any) => {
      if (user) {
        return next();
      } else {
        return res.status(err?.status || 401).json(notAuthorizedJson);
      }
    }
  )(req, res, next);
};

export default passport;
