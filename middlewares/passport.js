const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../models/user.mongo');

const UsersModel = new Users();


const generateHash = (password) => {
    let bcryptPassword = ''
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            bcryptPassword = hash
        });
    });
}

passport.use('signup', new LocalStrategy(async (username, password, done) => {
    try {
        let newUser = {
            email: username,
            password: generateHash(password)
        }
        const user = await UsersModel.save(newUser)
        return done(null, user)
    } catch (error) {
        console.log('Error signing user up...')
        return done(error)
    }
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UsersModel.getByEmail(username)
        let isValidPassword = bcrypt.compare(password, user.password, (err, result) => {
            return result;
        });
        if (!isValidPassword) {
            console.log('Error signing user up...')
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        console.log('Error signing user up...')
        return done(error)
    }
}))


passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.getById(id)
    return done(null, user)
})

module.exports = passport;