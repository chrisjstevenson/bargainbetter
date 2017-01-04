const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const User = require('../server/models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id, (err, user) => {
      done(err, user);
   });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { msg: 'Invalid email or password.' });
        });
    });
}));


/**
 * Sign in with LinkedIn.
 */
passport.use(new LinkedInStrategy({
    clientID: config.linkedInId,
    clientSecret: config.linkedInSecret,
    callbackURL: config.linkedInCallBackUrl,
    scope: ['r_basicprofile', 'r_emailaddress'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        User.findOne({ linkedin: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                done(err);
            } else {
                User.findById(req.user.id, (err, user) => {
                    if (err) { return done(err); }
                    user.linkedin = profile.id;
                    user.tokens.push({ kind: 'linkedin', accessToken });
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.firstName = profile.firstName;
                    user.profile.lastName = profile.lastName;
                    user.profile.location = user.profile.location || profile._json.location.name;

                    var profilePictureUrl = 'https://www.fillmurray.com/g/200/300'; // as a default
                    if (profile._json.pictureUrls.values) {
                        profilePictureUrl = profile._json.pictureUrls.values[0];
                    }

                    user.profile.picture = user.profile.picture || profilePictureUrl;
                    user.profile.website = user.profile.website || profile._json.publicProfileUrl;
                    user.save((err) => {
                        if (err) { return done(err); }
                        req.flash('info', { msg: 'LinkedIn account has been linked.' });
                        done(err, user);
                    });
                });
            }
        });
    } else {
        User.findOne({ linkedin: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                console.log(existingUser);
                return done(null, existingUser);
            }
            User.findOne({ email: profile._json.emailAddress }, (err, existingEmailUser) => {
                if (err) { return done(err); }
                if (existingEmailUser) {
                    req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
                    done(err);
                } else {
                    const user = new User();
                    user.linkedin = profile.id;
                    user.tokens.push({ kind: 'linkedin', accessToken });
                    user.email = profile._json.emailAddress;
                    user.profile.name = profile.displayName;
                    user.profile.firstName = profile.firstName;
                    user.profile.lastName = profile.lastName;
                    user.profile.location = profile._json.location.name;
                    user.profile.picture = profile._json.pictureUrls.values[0];
                    user.profile.website = profile._json.publicProfileUrl;
                    user.save((err) => {
                        done(err, user);
                    });
                }
            });
        });
    }
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
