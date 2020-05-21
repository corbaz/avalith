/** admin_Schema.ts
 *
 * Definición del Esquema de admin (Admin_Schema) para exportar.
 * Importación de la clases Schema de mongoose.
 * Instanciamos con new Schema()
 * Parametro: 2 objeto con las definiciones de: los campos y el timestamps.
 */

import { Schema } from "mongoose";
import * as bcrypt from "bcryptjs";

export const Admin_Schema = new Schema(
	{
		admin_email: { type: String, required: true, alias: "email" },
		admin_pass: { type: String, required: true, alias: "password" },
		admin_apellido: { type: String, required: true, alias: "apellido" },
		admin_nombre: { type: String, required: true, alias: "nombre" },
		admin_area: { type: String, required: true, alias: "area" },
		admin_fecha_de_alta: {
			type: Date,
			default: Date.now,
			alias: "fecha_alta"
		}
	},
	{
		/** Permitir generación id */
		id: true,
		/** Permite auto Creacion de Indices*/
		autoIndex: true,
		/** Create y Update */
		timestamps: true
	}
);

/** Metodo de Cifrado */
Admin_Schema.methods.encriptado = async function(pass_ingresada: string) {
	const salt: string = await bcrypt.genSalt(12);
	const pass_cifrada: string = await bcrypt.hash(pass_ingresada, salt);
	return pass_cifrada;
};

/** Metodo de Comparacion */
Admin_Schema.methods.comparacion = async function(pass_ingresada: string) {
	const comparacion: boolean = await bcrypt.compare(
		pass_ingresada,
		this.admin_pass
	);

	return comparacion;
};
