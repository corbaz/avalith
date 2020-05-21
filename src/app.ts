/** app.ts - Configuracion de la App*/
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import express_handlebars from 'express-handlebars';
import handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
// TODO import morgan from "morgan";
import morganBody from 'morgan-body';
import path from 'path';
import { Router } from './routes/router';
// TODO  clase_my_helpers
import { clase_my_helpers } from './views-helpers/my_helpers';

/** Modulo dotenv. Carga variables de entorno de un archivo .env para process.env
 *  usando su metodo config() - Solamente en etapa de desarrollo
 */
let MONGODB_HOST: string;
let MONGODB_DB: string;
let MONGODB_USER: string;
let MONGODB_PASS: string;
let MONGODB_URI: string;

if (process.env.NODE_ENV === 'development') {
	dotenv.config({
		path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
	});

	console.log(`Entorno de Ejecucion: ${process.env.NODE_ENV}`);
	console.log(`Programador : ${process.env.PROGRAMADOR}`);

	MONGODB_HOST = process.env.MONGODB_HOST;
	MONGODB_DB = process.env.MONGODB_DB;
	MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;
}

//	MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@clusterjcc-rrlah.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;
if (process.env.NODE_ENV === 'production') {
	dotenv.config({
		path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
	});
	console.log(`Entorno de Ejecucion: ${process.env.NODE_ENV}`);
	console.log(`Programador : ${process.env.PROGRAMADOR}`);

	MONGODB_HOST = process.env.MONGODB_HOST;
	MONGODB_DB = process.env.MONGODB_DB;
	MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;
}

class App {
	public app: express.Application;
	public Router: Router = new Router();
	public MyHelpers: clase_my_helpers = new clase_my_helpers();

	public mongodb_URI: string = MONGODB_URI;

	constructor() {
		this.app = express();
		this.config();
		this.Router.rutas(this.app);
		this.mongodb_config();
	}

	private config(): void {
		if (process.env.NODE_ENV === 'development') {
			/** Middleware morganBody
			 * Registra e informa las HTTP request node.js
			 *
			 * Formatos Predefinidos
			 * this.app.use(morgan("dev"));
			 * 'tiny'- 'short' - 'dev' - 'common' - 'combined'
			 */
			morganBody(this.app, {
				noColors: false,
				maxBodyLength: 1000,
				prettify: true,
				logReqUserAgent: false,
				logRequestBody: false,
				logResponseBody: false,
				skip: null,
				stream: null,
				theme: 'usa',
			});
		} else if (process.env.NODE_ENV === 'production') {
			this.app.use(compression());
		}

		/** Middleware
		 * Convierte los datos que llegan en objeto json
		 */
		this.app.use(express.urlencoded({ extended: true }));

		/** Middleware
		 * Permite usar verbos HTTP como PUT o DELETE en
		 * lugares donde el cliente no lo admite
		 */
		this.app.use(
			methodOverride(function (req, res) {
				if (req.body && typeof req.body === 'object' && '_method' in req.body) {
					// look in urlencoded POST bodies and delete it
					var method = req.body._method;
					delete req.body._method;
					return method;
				}
			})
		);

		/** Motor de Plantilla o Vista y Helpers
		 * express-handlebars (view engine) para Express
		 * Helpers - Handlebars - Funciones

		 * Config del Motor de Plantilla
		 */

		helpers({
			handlebars: handlebars,
		});

		this.app.set('views', path.join(__dirname, 'views'));
		this.app.engine(
			'hbs',
			express_handlebars({
				handlebars: handlebars,
				extname: 'hbs',
				defaultLayout: 'main',
				layoutsDir: path.join(this.app.get('views'), 'layouts'),
				partialsDir: path.join(this.app.get('views'), 'partials'),
				helpers: this.MyHelpers,
				// TODO: Motor HBS
			})
		);
		this.app.set('view engine', 'hbs');

		/** Definicion de la carpeta public
		 * para archivos estaticos.( .css, .js, imagenes )
		 */
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private mongodb_config(): void {
		//console.log("mongodb_URI :", this.mongodb_URI);
		mongoose
			.connect(this.mongodb_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				serverSelectionTimeoutMS: 5000, // Timeout de 5s en lugar de 30s
			})
			.then(() =>
				console.log(
					`Conectado a MongoDB Atlas o localhost - ${this.mongodb_URI}`
				)
			)
			.catch((err) =>
				console.log('Error al connectar MongoDB Atlas o localHost', err)
			);
	}
}

export default new App().app;
