const fs = require('fs');  // Requiuriendo el paquete fileSystem 
const path = require('path');   // Requiriendo el paquete path para solovitar archivos

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');   // Guardadno en la variable la ruta de nuestras base de datos 
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));  //  Convirtiendo  los datos de la bd a lista o array e idicandole los caracteres soportados 

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
	let ofertas = products.filter((element)=>{//filtrando mi lista buscando el elemento 
		return element.category	== 'in-sale'// buscando categorias iguales a in-sale	
	})
	let ultimaVistas = products.filter((element)=>{//filtrando mi lista buscando el elemento
		return element.category == 'visited'// buscando categorias iguales a vistas
	})	
		res.render('index', {ofertas, ultimaVistas})
	},
	search: (req, res) => {
		res.render('results')
	},
	register: (req, res)=>{
		res.render('register')
	}
};

module.exports = controller;
