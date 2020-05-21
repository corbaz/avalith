/** employee_funciones.ts */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { My_Controllers } from '../controllers/my_controllers';
import { Schema_Areas } from '../models/schema_areas';
import { Schema_Employee } from '../models/schema_employee';

const Collection_Employee: string = 'collection_employee';
const Model_Employee: mongoose.Model<mongoose.Document, {}> = mongoose.model(
	'Model_Employee',
	Schema_Employee,
	Collection_Employee
);

const tools: My_Controllers = new My_Controllers();

export class Employee_Funciones {
	public async Consulta_Gral(req: Request, res: Response) {
		await Model_Employee.find({}, (err, registros) => {
			if (err) {
				res.send(err);
			}
			res.render('employee/employee_consulta_gral.hbs', {
				title: 'Consulta Completa de Employee',
				registros: registros,
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
				botones: [
					{
						nombre: 'Salir',
						tipo_link: true,
						type: 'button',
						link: '/',
						color: 'danger',
					},
				],
			});
		});
	}

	public async Alta(req: Request, res: Response) {
		let employee_email = req.body.employee_email.trim();
		let { employee_pass, employee_area } = req.body;
		let employee_apellido = tools
			.Capitalizer(req.body.employee_apellido)
			.trim();
		let employee_nombre = tools.Capitalizer(req.body.employee_nombre).trim();

		const Document_Employee = new Model_Employee({
			employee_email,
			employee_pass,
			employee_area,
			employee_apellido,
			employee_nombre,
		});

		await Document_Employee.save((err, registro) => {
			if (err) {
				res.send(err);
			}
			res.redirect('/employee');
		});
	}

	public async Consulta_ID(req: Request, res: Response) {
		await Model_Employee.findOne(
			{ _id: req.params.Employee_ID },
			(err, registro) => {
				if (err) {
					res.send(err);
				}
				let registro_json = registro.toObject();
				//console.log("object JSON:", registro_json);
				//console.log("object :", registro);

				res.render('employee/employee_modificacion.hbs', {
					registro: registro,
					seleccionado: registro_json.employee_area,
					areas: new Schema_Areas().AREAS,
					id: 'modificacion _employee',
					title: 'Modificación de Employee',
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
					botones: [
						{
							id: 'salir',
							nombre: 'Salir',
							tipo_link: true,
							type: 'button',
							link: '/employee',
							color: 'danger',
						},
						{
							id: 'ok',
							nombre: 'Guardar Modificacion',
							tipo_link: false,
							type: 'submit',
							link: '',
							color: 'primary',
						},
					],
				});
			}
		);
	}

	public async Modificacion_ID(req: Request, res: Response) {
		//console.log("req findOneAndUpdate:", req.params.Employee_ID);
		//console.log("req Modificacion_ID:", req.body);
		await Model_Employee.findOneAndUpdate(
			{ _id: req.params.Employee_ID },
			{
				$set: {
					employee_email: req.body.employee_email.trim(),
					employee_pass: req.body.employee_pass,
					employee_area: req.body.employee_area,
					employee_apellido: tools
						.Capitalizer(req.body.employee_apellido)
						.trim(),
					employee_nombre: tools.Capitalizer(req.body.employee_nombre).trim(),
				},
			},
			{ new: true },
			(err, registro) => {
				if (err) {
					res.send(err);
				}
				console.log('registro modificado grabado:', registro);
				// $("document.#myModal").modal("show");
				res.status(200).redirect('/employee');
			}
		);
	}

	public async Baja_ID(req: Request, res: Response) {
		await Model_Employee.findByIdAndDelete(
			{ _id: req.params.Employee_ID },
			(err) => {
				if (err) {
					res.send(err);
				}
				res.redirect('/employee');
			}
		);
	}
}
