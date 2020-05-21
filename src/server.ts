/** server.js - Codigo de Inicio del Servidor Express */
import app from './app';
// import * as https from "https";
// import * as fs from "fs";

// si existe la variable HOST estamos trabajando local sino Heoku remplazara la ip 0.0.0.0
app.set('host', process.env.HOST || '0.0.0.0');

// si no existe variable de entorno PORT le damos 5000 sino Heroku asignara
app.set('port', process.env.PORT);

app.listen(app.get('port'), app.get('host'), () => {
	console.log(`
	Servidor Express corriendo en el port ${app.get('port')}
	`);
});
