import express from "express";
import { addText, getTextList, getTextMeta } from "./controllers/text";
import { signUp, signIn } from "./controllers/user";
import { authenticateJWT } from "./middlewares/auth";
import { cacheEndpoint } from "./middlewares/cache";
import passport from "passport";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/text/:id/:type", authenticateJWT, cacheEndpoint, getTextMeta);
router.get("/texts", authenticateJWT, cacheEndpoint, getTextList);
router.post("/text", authenticateJWT, addText);
router.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});

export default router;
