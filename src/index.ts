import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import allRoutes from "./routes";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/logger";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { googleClientId, googleClientSecret } from "./configs";
import session from "express-session";

const app = express();
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
let userProfile: any;
dotenv.config();
app.use(bodyParser.json());
app.use(express.static("public"));
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);
app.use("/v1/api", allRoutes);
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:8000/v1/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);
app.get("/success", (_, res) => res.send(userProfile));
app.get("/error", (_, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: Express.User, cb) {
  cb(null, obj);
});
mongoose
  .connect(process.env.MONGO_DB_URI as string, {})
  .then(() => logger.warn("MongoDB connection successful"))
  .catch((err) => logger.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
