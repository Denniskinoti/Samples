//landing page
//home page



const Category = require('../model/category')
const Product = require('../model/product');
const csurf = require('csurf')
var csrfProtection = csurf();

const landing = (req,res) => {
	res.render('home/landing')
}

//you need to authenticate this route
const home = (req,res) => {
	Product.find().then((products)=> {
		if(products) {
			
			
			res.render('home/home',{products:products});
		}
	}).catch((error)=> {
		throw error
	})

	
}

//singup page
const singup_page = (req,res) => {
	res.render('home/singup')
}
//login page
const login_page = (req,res) => {
	res.render('home/login')
}

const admin_dashboard = (req,res) => {
	res.render('admin/dashboard')
}
const new_category = (req,res) => {
	res.render('admin/category')
}

const new_product = (req,res) => {
	
	res.render('admin/products/new_product')
}

const edit_page = (req,res) => {
	console.log(req.product)
	res.render('admin/products/edit',{product:req.product})

}

//new product page
const product_page = (req,res) => {
	Category.find().then((category)=> {
		if(category) {
			res.render('admin/products/new_product',{category:category})
		}
	}).catch((error)=> {
		console.log('error in new product page');
		throw error
	})
	

}

//=== starting with the new youtube chaper
const newpage = (req,res) => {

}


module.exports = {landing, home,singup_page,login_page,admin_dashboard,new_category,new_product,
	product_page,edit_page,newpage}