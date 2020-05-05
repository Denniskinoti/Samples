const passport = require('passport');
const config = ('./config/config');
const jwstStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {findUserById, VerifyUser} = require('./actions/signin')
const localStrategy = require('passport-local');
const bcrypt = require('bcrypt')

const localOptions = {usernameField: 'email'}

const localLogin = new localStrategy(localOptions,(email,password,done) => {
	return VerifyUser(email)
		.then((validUser) => {
			bcrypt.compare(password, validUser.password)
				.then((validPassword)=> {
					if(validPassword) {
						return done(null, validUser)
					}
					return done(null, false)
				})
				.catch(err => done(err, false))
		})
})

const jwtOptions = {
	jwtFromRequest :ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.config,
}

const jwtLogin = new jwstStrategy(jwtOptions,(payload,done) => {
	return findUserById(payload.sub)
		.then((foundUser) => {
			if(foundUser) {
				return done(null, foundUser)
			}
			return done(null, false)
		})
		.catch(err =>  done(err, false))
})

passport.use(jwtLogin)
passport.use(localLogin)

