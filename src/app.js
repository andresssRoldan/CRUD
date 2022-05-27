// ************ Require's ************
const createError = require('http-errors'); //para generar errores en nuetro app 
const cookieParser = require('cookie-parser'); // para configurar uso de cookies en nuestro proyecto
const express = require('express'); // mrequiriendo express
const logger = require('morgan');  //  es un middleware que registra los reques junto conotra info que le configuremos 
const path = require('path');  // requiriendop path para manejar archivos 
const methodOverride =  require('method-override'); // REquiriedno metodo para poder usar  PUT y DELETE
const logMiddleware = require('./middlewares/logMiddleware') // Requiriendo el middleware global
// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));       // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));         // Necesario para capturar los name de los formularios enviados
app.use(express.json());                // Para convertir los datos enviados por el formulario a JSON
app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(logMiddleware); // Asi usamos nuestro middleware de manera global
// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');   // setiando las vistas para usar render en el controller
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() ************

const mainRouter = require('./routes/main'); // Requiriendo rutas main
const productsRouter = require('./routes/products'); // Requiriendo rutas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
