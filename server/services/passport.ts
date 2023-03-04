// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";

// import { googleClientID, googleClientSecret } from "../config/config.js";

// import mongoose from "mongoose";
// const User = mongoose.model("users");

// passport.use(
//   new GoogleStrategy.Strategy(
//     {
//       clientID: googleClientID,
//       clientSecret: googleClientSecret,
//       callbackURL: "/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       new User({ googleId: profile.id }).save();
//     }
//   )
// );
