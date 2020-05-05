const express = require('express');
const db = require('../db/config');

const createUser = (name,email,password)=> {
	const query = `INSERT INTO users (name,email,password) values($1,$2,$3) RETURNING *`
	return console.log('hello kenya') //db.one(query,[name, email,password])
}

module.exports = {createUser};



