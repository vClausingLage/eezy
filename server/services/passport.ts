import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import { googleClientID, googleClientSecret } from "../config/config.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refresh", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
    }
  )
);
