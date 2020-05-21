# NodeJS BE challenge 2020

Aplicacion de Votacion de empleaados.

---

## Creación del Proyecto API REST en Node.js

node --version

- v13.7.0

mongod --version

- db version v4.2.1

## Creación del package.json

- npm init

### Instalación de los Módulos de Dependencias y de Dependencias de Desarrollo

\*\*dependencies

- @types/bcryptjs": "^2.4.2", Definiciones de Tipo para TypeScript de bcryptjs.
- @types/bootstrap": "^4.3.2", Definiciones de Tipo para TypeScript de bootstrap.
- @types/ejs": "^3.0.1", Definiciones de Tipo para TypeScript de ejs.
- @types/express: "^4.17.3", Definiciones de Tipo para TypeScript de express.
- @types/jquery": "^3.3.34", Definiciones de Tipo para TypeScript de jquery.
- @types/mongoose": "^5.7.8", Definiciones de Tipo para TypeScript de mongoose.
- bcryptjs: "^2.4.3", Modulo de cifrado o encriptado.
- body-parser": "^1.19.0", Middleware para analizar el Body de solicitud entrantes bajo la propiedad (req.body).
- bootstrap": "^4.4.1", Librería de Boostrap 4.
- connect-flash: "^0.1.1", Middleware para enviar mensajes entre vistas.
- ejs": "^3.0.1", Motor de Plantillas de Vistas para Express.
- express: "^4.17.1", Framework de Servidor de WEB para Node.js.
- express-session: "^1.17.0", Middleware de sesión simple para Express.
- jquery": "^3.4.1", Librería Jquery.
- method-override: "^3.0.0", Permite usar verbos HTTP como PUT o DELETE.
- mongoose: "^5.9.6", Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono. Mongoose admite promesas y devoluciones de llamadas.
- passport: "^0.4.1", Middleware de autenticación compatible con Express para Node.js.
- passport-local: "^1.0.0" Módulo que permite autenticarse utilizando un nombre de usuario y contraseña.
- popper.js": "^1.16.1", Libreria usada por Jquery.

\*\* devDependencies

- dotenv: "^8.2.0", Modulo para trabajar con las variables de Entorno.
- handlebars: "^4.7.3", Extensión de Motor de Plantilla. Mantiene separado la vista del codigo.
- nodemon: "^2.0.2", Herramienta de monitoreo que reinicia automáticamente
  la aplicación cuando se detectan cambios en el directorio o los directorios.
- npm-check-updates: "^4.1.0", Herramienta de monitoreo de nuevas versiones de dependencias en el proyecto.
- ts-node: "^8.8.1", Entorno de ejecución TypeScript y REPL para node.js.
- ts-node-dev": "^1.0.0-pre.44", Extensión para compilar la aplicación TypeScript y reiniciar los procesos de Node cuandos los archivos se modifican.
- typescript: "^3.8.3", Compilador de Javascript basado en estándares.

### Scripts del package.json

- **"build": "tsc",** Script de compilación. Los archivos .ts de la carpeta ./src se compilan en archivos .js en la carpeta ./dist
- **"dev": "ts-node-dev ./src/index.ts",** Script para fase de Desarrollo. Reincia los procesos de node ante los cambios de los archivos. Ejecutando la compilacion de Typescript de dichos cambios previo al reinicio.
- **"start": "nodemon ./dist/index.js",** Script para el Monitoreo de cambios y reseteo del servidor.
- **"prod": "npm run build && npm run start",** Script de fase de Producción.

### Configuracion de Typescript - tsconfig.json

{
"compilerOptions": {
"module": "commonjs",
"moduleResolution": "node",
"pretty": true,
"sourceMap": true,
"target": "es6",
"outDir": "./dist",
"baseUrl": "./src"
},
"include": [
"src/**/*.ts"
],
"exclude": [
"node_modules"
]
}
