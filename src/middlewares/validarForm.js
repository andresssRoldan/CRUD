const {body} = require('express-validator'); // Usando estructuracion para usar la funcion body y validar los campos del formulario
 
const validarForm = [
    body('name').notEmpty().withMessage('debe llenar el nombre'),
    body('price').notEmpty().withMessage('debe llenar el precio'),
    body('discount').notEmpty().withMessage('debe llenar el descuento'),
    body('category').notEmpty().withMessage('debe llenar el categoria'),
    body('description').notEmpty().withMessage('debe llenar descripcion'),
    //body('image').notEmpty().withMessage('debe subir una imagen')
]

module.exports = validarForm;