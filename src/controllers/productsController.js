const fs = require('fs');
const path = require('path');
const { validationResult} =  require('express-validator');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let listProductos = products;
		res.render('products', {listProductos})//Renderizando products + lista de productos del archivo json 
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		//capturando el id y alamcenandolo
		let idproducto = req.params.id
		//Buscando el elemento que necesito para comparar con el que me llego por el id 
		const producto = products.find(element => element.id == idproducto);
		//en caso de que no exista el producto mostrar error en 404 o un redirect a products
		if (producto == undefined) {
			res.redirect('/products')			
		}
		//Renderizando la vista detail
		res.render('detail.ejs', {producto})
	},
 
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form.ejs')
	},
	
	// Create -  Method to store
	store: (req, res) => { 
		//capturar file y filename de multer
		//  verificar si llego la imagen	
		let result = validationResult(req)
		let filename = "default-image.png";
			if(req.file){ // ppppreguntando si se subio la imagen
				 filename = req.file.filename
			}else{
				let errorImagen =  { //  declarando el error manualmente
					msg: 'Subir  una imagen'									
				  }
				result.errors.push(errorImagen) // añadiendo el posible error a el array de errores

			}
		if (result.errors.length <= 0) {
			//capturar los datos enviados en el formulario
			const nuevoProducto ={
			id: (Date.now()),
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: filename
			}
			//Guardas datos en la Bd
		products.push(nuevoProducto)//usando el metodo push agregamos mi nuevo producto a la bd		
		
		fs.writeFileSync(productsFilePath, JSON.stringify(products))// Escribiendo  los datos y convirtiendolos a archivos JSON
		//Direccionar el usuario
		res.redirect('/products')
		} else{
			res.render('product-create-form.ejs', {errores: result.errors})
		}				
	},

	// Update - Form to edit
	edit: (req, res) => {
		//let productGuardado = 
		let idProducto = req.params.id;
		const producEdit = products.find(element => element.id == idProducto);
		res.render('product-edit-form.ejs',{producEdit})
	},

	// Update - Method to update
	update: (req, res) => {
		//obtener  el id  del producto
		let ediProduct = req.params.id;
		let miNumero = parseInt(ediProduct,);//convirtiendolo a entero llegan en string
		let image = req.file.filename;// capturando la imagen enviar en el file 

		const editProduct = {
			id: miNumero,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: image			
		}					   
		
		//Buscando el elemento con el mismo id
		let nuevaLista = [];
		products.forEach(element => {	
			if (element.id != miNumero) {
				nuevaLista.push(element)
			}else{
				editProduct.image == element.image
				nuevaLista.push(editProduct)
			}			
		});		
		//guardarlos en la base de datos	
		fs.writeFileSync(productsFilePath, JSON.stringify(nuevaLista, 'utf-8'));		
		res.redirect('/products')
	},

	// //////Delete - Delete one product from DB
	destroy : (req, res) => {
		//capturar el id 
		let idproducto = req.params.id
		//filtramos para guardar en un nuevo array los productos diferente al que vamos a eliminar
		const productsFiltrado = products.filter((products)=>{
			return products.id != idproducto;
		})
		//almacenando los nuevos productos  -el eliminado asi quedara actualizada la base dedatos com los productos existentes
		fs.writeFileSync(productsFilePath, JSON.stringify(productsFiltrado));		//products = productsFiltrado
		res.redirect('/')
	}
};

module.exports = controller;