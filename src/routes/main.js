// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController'); // requiriendo el mainController

    //  Rutas hacia los metodos del contprolador
router.get('/', mainController.index);   //   Indicando el metodo index para uasr en el controller
router.post('/search', mainController.search);

router.get('/register', mainController.register)

module.exports = router;
