// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path') // para ubicar o especificar archivos 
const multer = require('multer'); // añadiendo multer para poder subir archivos multimedia 
const logDBMiddleware = require('../middlewares/logDBMiddleware'); // Requiriendo middleware a nivel de ruta esppecifica
const validarForm = require('../middlewares/validarForm');

//******diciendole a multer donde guardar los archivops y con que nombre
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/images/products'));  //Donde se van a guardar los archivos
    },
    filename: (req, file, cb)=>{
        const nuevaCarpeta = 'image-' + Date.now() + path.extname(file.originalname) ;  // En nombre  de nuestro archivop
        cb(null, nuevaCarpeta )

    }
});   
const upload = multer({storage})  //Ejecucion de multer

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const { nextTick } = require('process');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); //Renderizando la vista de todos los productos products

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); //Renderizando la vista del formulario create
router.post('/', logDBMiddleware, upload.single('image'), validarForm, productsController.store); //Recibiendpo por post los datos del formulario 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); //Renderizando la vista dellate de producto

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit);// 
router.put('/productoEditado/:id', upload.single('image'), productsController.update); // el upload es la ejecucion de multer y su funcionalidad hecha en storage


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); //eliminnando un producto


module.exports = router;
