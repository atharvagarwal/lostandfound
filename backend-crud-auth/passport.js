const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userModel = require("./model/userModel")
const findOrCreate = require('mongoose-findorcreate')
const passport = require("passport");

const GOOGLE_CLIENT_ID ="903764386891-g6ohsmk52c3p1ntip49q35jpf71a61hc.apps.googleusercontent.com"

const GOOGLE_CLIENT_SECRET = "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"




passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
      

      userModel.findOrCreate({ googleId: profile.id,name: profile.name.givenName+" "+profile.name.familyName,email: profile.emails[0].value}, function (err, user) {
       
        return cb(err, user);
      })}
    
));




passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
