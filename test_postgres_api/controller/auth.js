const db = require('../db/config');
const config = require('../config/configg');
const secret = 'thisismyonlyname'
const {createUser} = require('../actions/singup');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config)
}

const login = (req,res,next) => {
  res.send({token: tokenForUser(req.user)})
}

const signup = (req,res,next) => {
  const {name,email,password} = req.body
  const saltRounds = 12;

  if(!email || !password) {
    res.status(422).send({error:"you must provide an email and a password"})
  }

  bcrypt.hash(password,saltRounds)
    .then((hash) => {
      return  newUser = db.query('insert into users (name,email,password) values($1,$2,$3)',[name,email,hash])
        .then((newUser)=> {
          res.json({token:tokenForUser(newUser)})
        })
        .catch((err)=> {
          throw err
          res.json({error: "erro saving signup data to db"})
        })
    })
    .catch((err)=> {
      return next(err)
    })
}




module.exports = {login,signup};