const db = require('../db/config');



const getAllUsers = (req,res,next)=> {

	db.query('select * from users',(err,result)=>{
		if(err) {
			res.status(400).send('error in connection')
		}

		res.status(200).json(result.rows);
		console.log('this is the getusers route ')
	})
}

const getUserById = (req,res,next)=> {
	const id =parseInt(req.params.id);

	db.query('select * from users where id=$1',[id],(err,results)=>{
		if(err) {
			throw err
		}
		res.status(200).json(results.rows);
		console.log('successfully found id');
	})
}

//delete item

const removeItem = (req,res,next)=> {
	const dd = parseInt(req.params.id);

	db.query('DELETE from users where id=$1',[dd],function(err,result){
		if(err) {
			throw err
		}
		res.status(200).json(result.rows);
		console.log('item deleted');
	})
}

const Adduser =(req,res,next)=> {
	const name = req.body;
	const email = req.body;
	const password = req.body;
	db.query('INSERT INTO users (name,email,password) values($1,$2,$3)',[name,email,password],(err,results)=>{
		if(err) {
			throw err
		}
		res.status(201).send('successfully added a new item');
	})
}

module.exports = {getAllUsers,getUserById,removeItem,Adduser}