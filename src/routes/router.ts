/** router.ts */

import axios from 'axios';
import cheerio from 'cheerio';
import { Application, Request, Response } from 'express';
import querystring from 'querystring';
//import { Admin_Funciones } from "../controllers/admin_funciones";
import { Employee_Funciones } from '../controllers/employee_funciones';
import { Schema_Areas } from '../models/schema_areas';

export class Router {
	//	public Admin_Funciones: Admin_Funciones = new Admin_Funciones();
	public Employee_Funciones: Employee_Funciones = new Employee_Funciones();

	public rutas(app: Application): void {
		app.route('/voz').get((req: Request, res: Response) => {
			(async () => {
				try {
					const response = await axios.post(
						'https://notevibes.com/cabinet.php',
						querystring.stringify({
							content:
								'Microsoft Windows Versión 10.0.17134.1304 (c) 2018 Microsoft Corporation. Todos los derechos reservados.',
							time: '1588791077',
							casestatus: 'amazon',
							engine: 'standard',
							profile: 'noprofile',
							pitch: '0',
							saveas: 'mp3',
							speed: '1',
							voice: 'Mia',
						})
					);
					if (response.data.includes('<source')) {
						const $ = cheerio.load(response.data);
						console.log('inicio', $('audio').html(), 'Fin');
						//console.log("response.request :>> ", response.request);
						res.send('inicio' + $('html').html() + 'Fin');
					}
				} catch (error) {
					console.error(error);
				}
			})();
		});

		//** brand-2020 / * /
		app.route('/2020').get((req: Request, res: Response) => {
			res.status(200).render('2020.hbs', {
				title: 'Avalith 2020',
				op_brand_url: '/2020',
				op_brand_title: 'Challenge 2020',
				op_01_url: '/',
				op_01_title: 'Avalith',
				op_02_url: '/about',
				op_02_title: 'About',
				op_03_url: '/employee',
				op_03_title: 'Employee',
				op_04_url: '/employee/registrar',
				op_04_title: 'Registrarse',
				op_05_url: '/employee/login',
				op_05_title: 'Login',
				footer: 'Copyright © Avalith 2020',
				link_footer: 'https://es-la.facebook.com/avalith.net/',
			});
		});

		//** Raiz 01-avalith / * /
		app.route('/').get((req: Request, res: Response) => {
			res.render('avalith.hbs', {
				title: 'Avalith',
				h1: 'Avalith',
				h3: 'NodeJS BE challenge 2020',
				h4: 'Sistema de Votación',
				link_produccion: 'https://juliocorbaz.000webhostapp.com',
				produccion: 'Creado por JCC Producciones',
				op_brand_url: '/2020',
				op_brand_title: 'Challenge 2020',
				op_01_url: '/',
				op_01_title: 'Avalith',
				op_02_url: '/about',
				op_02_title: 'About',
				op_03_url: '/employee',
				op_03_title: 'Employee',
				op_04_url: '/employee/registrar',
				op_04_title: 'Registrarse',
				op_05_url: '/employee/login',
				op_05_title: 'Login',
				empresa_nombre: 'Avalith 2021',
				empresa_link_web: 'http://www.avalith.net',
				empresa_telefono: '+54 223 464-4850',
				empresa_email: 'mailto:hello@avalith.net',
				empresa_facebook: 'https://es-la.facebook.com/avalith.net/',
				empresa_twitter: 'https://twitter.com/HolaAvalith',
				empresa_linkedin: 'https://www.linkedin.com/company/avalith-net/',
				empresa_youtube:
					'https://www.youtube.com/channel/UCfbYkqwV3q4MEZg60f0ABtg',
				empresa_instagram: 'https://www.instagram.com/avalithar/',
			});
		});

		//** 02-About /about */
		app.route('/about').get((req: Request, res: Response) => {
			res.render('about.hbs', {
				array: ['Julio', 'Ale', 'Charo', 'Lola', 'Sancho'],
				title: 'About',
				op_brand_url: '/2020',
				op_brand_title: 'Challenge 2020',
				op_01_url: '/',
				op_01_title: 'Avalith',
				op_02_url: '/about',
				op_02_title: 'About',
				op_03_url: '/employee',
				op_03_title: 'Employee',
				op_04_url: '/employee/registrar',
				op_04_title: 'Registrarse',
				op_05_url: '/employee/login',
				op_05_title: 'Login',
				footer: 'Copyright © Avalith 20210',
				link_footer: 'https://es-la.facebook.com/avalith.net/',
			});
		});

		//** 03-Employee /employee */ esta Consulta Gral - Todos - Employee

		//** 04-Registrarse /employee/registrar */
		app.route('/employee/registrar').get((req: Request, res: Response) => {
			//console.log("Listado de Areas: ", areas);
			res.render('employee/employee_registrar.hbs', {
				seleccionado: 'Seleccione su Area de Trabajo',
				areas: new Schema_Areas().AREAS,
				title: 'Registración de Employee',
				op_brand_url: '/2020',
				op_brand_title: 'Challenge 2020',
				op_01_url: '/',
				op_01_title: 'Avalith',
				op_02_url: '/about',
				op_02_title: 'About',
				op_03_url: '/employee',
				op_03_title: 'Employee',
				op_04_url: '/employee/registrar',
				op_04_title: 'Registrarse',
				op_05_url: '/employee/login',
				op_05_title: 'Login',
				footer: 'Copyright © Avalith 2020',
				link_footer: 'https://es-la.facebook.com/avalith.net/',
				botones: [
					{
						nombre: 'Salir',
						tipo_link: true,
						type: 'button',
						link: '/',
						color: 'danger',
					},
					{
						nombre: 'Reset',
						tipo_link: false,
						type: 'reset',
						link: '',
						color: 'danger',
					},
					{
						nombre: 'Registrarse',
						tipo_link: false,
						type: 'submit',
						link: '',
						color: 'primary',
					},
				],
			});
		});

		//** 05-Login /login */
		app.route('/employee/login').get((req: Request, res: Response) => {
			res.render('employee/employee_login.hbs', {
				title: 'Login de Employee',
				op_brand_url: '/2020',
				op_brand_title: 'Challenge 2020',
				op_01_url: '/',
				op_01_title: 'Avalith',
				op_02_url: '/about',
				op_02_title: 'About',
				op_03_url: '/employee',
				op_03_title: 'Employee',
				op_04_url: '/employee/registrar',
				op_04_title: 'Registrarse',
				op_05_url: '/employee/login',
				op_05_title: 'Login',
				footer: 'Copyright © Avalith 2020',
				link_footer: 'https://es-la.facebook.com/avalith.net/',
				botones: [
					{
						nombre: 'Salir',
						tipo_link: true,
						type: 'button',
						link: '/',
						color: 'danger',
					},
					{
						nombre: 'Reset',
						tipo_link: false,
						type: 'reset',
						link: '',
						color: 'danger',
					},
					{
						nombre: 'Login',
						tipo_link: false,
						type: 'submit',
						link: '',
						color: 'primary',
					},
				],
			});
		});

		/**
		 * Employee_Funciones - CRUD
		 */

		// GET - Consulta Gral - Todos - Employee
		app.route('/employee').get(this.Employee_Funciones.Consulta_Gral);

		// POST - Alta - Employee
		app.route('/employee/alta').post(this.Employee_Funciones.Alta);

		// GET - Consulta x ID - Employee
		app
			.route('/employee/consulta/:Employee_ID')
			.post(this.Employee_Funciones.Consulta_ID);

		// PUT - Modificacion x ID - Employee
		app
			.route('/employee/modificacion/:Employee_ID')
			.put(this.Employee_Funciones.Modificacion_ID);

		// DELETE - Baja x ID - Employee
		app
			.route('/employee/baja/:Employee_ID')
			.delete(this.Employee_Funciones.Baja_ID);
	}
}
