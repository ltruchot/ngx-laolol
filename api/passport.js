const CONFIG = require('./config');

// mongoose models
const User = require('./models/usersModel');

// Importing Passport & strategies
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// vars
const localOptions = { usernameField: 'email' };
const errMsgs = {
	login: 'Your login details could not be verified. Please try again.'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, {
				error: errMsgs.login
			});
		}
		user.comparePassword(password, function (err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) {
				return done(null, false, {
					error: errMsgs.login
				});
			}
			return done(null, user);
		});
	});
});

// Setting up JWT
const jwtOptions = {
	// Telling Passport to check authorization headers for JWT
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	// Telling Passport where to find the secret
	secretOrKey: CONFIG.secretJWT
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	User.findById(payload._id, function (err, user) {
		if (err) { return done(err, false); }
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);
