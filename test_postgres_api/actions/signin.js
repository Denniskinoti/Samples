const db = require('../db/config');

const findUserById = (req,res,next) => {
	const query = `SELECT * from user where $id = 1`
	return db.oneOrNone(query,[id]);
}

const verifyUser = (req,res,next)=> {
	const query = `SELECT * from users where email=$1`
	return db.oneOrNone(query,[email])

}

module.exports = {findUserById, verifyUser}