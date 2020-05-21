/** employee_schema.ts
 *
 * Definición de Esquema de Employee (Schema_Employee) para exportar.
 * Importación de la clases Schema de mongoose.
 * Instanciamos con new Schema()
 * Parametro: 2 objeto con las definiciones de: los campos y el timestamps.
 */

import * as bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';

export const Schema_Employee = new Schema(
	{
		employee_email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			alias: 'email',
		},
		employee_pass: {
			type: String,
			required: true,
			trim: true,
			alias: 'password',
		},
		employee_area: {
			type: String,
			required: true,
			trim: true,
			alias: 'area',
		},
		employee_apellido: {
			type: String,
			required: true,
			trim: true,
			alias: 'apellido',
		},
		employee_nombre: {
			type: String,
			required: true,
			trim: true,
			alias: 'nombre',
		},
		employee_fecha_de_alta: {
			type: Date,
			default: Date.now,
			trim: true,
			alias: 'fecha_alta',
		},
	},
	{
		/** Permitir generación id */
		id: true,
		/** Permite auto Creacion de Indices*/
		autoIndex: true,
		/** Create y Update */
		timestamps: true,
	}
);

/** Metodo de Cifrado */
Schema_Employee.methods.encriptado = async function (pass_ingresada: string) {
	const salt: string = await bcrypt.genSalt(12);
	const pass_cifrada: string = await bcrypt.hash(pass_ingresada, salt);
	return pass_cifrada;
};

/** Metodo de Comparacion */
Schema_Employee.methods.comparacion = async function (pass_ingresada: string) {
	const comparacion: boolean = await bcrypt.compare(
		pass_ingresada,
		this.admin_pass
	);

	return comparacion;
};
