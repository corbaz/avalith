/** admin_funciones.ts */

import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { Admin_Schema } from "../models/schema_admin";

const Admin = mongoose.model("Admin", Admin_Schema);

export class Admin_Funciones {
	public Alta(req: Request, res: Response) {
		console.log("Formulario Body :", req.body);
		res.send(req.body);
		// res.render("admin_alta.ejs", {
		// 	title: "Alta Admin"
		// });
		// 	let nuevo_Admin = new Admin(req.body);
		// 	nuevo_Admin.save((err, registro) => {
		// 		if (err) {
		// 			res.send(err);
		// 		}
		// 		res.json(registro);
		// 	});
	}

	public Consulta(req: Request, res: Response) {
		Admin.find({}, (err, registro) => {
			if (err) {
				res.send(err);
			}
			res.json(registro);
		});
	}

	public Consulta_ID(req: Request, res: Response) {
		Admin.findById(req.params.Admin_ID, (err, registro) => {
			if (err) {
				res.send(err);
			}
			res.json(registro);
		});
	}

	public Modificacion_ID(req: Request, res: Response) {
		// sin no se agrega {new: true}, el documento actualizado no será devuelto.
		Admin.findOneAndUpdate(
			{ _id: req.params.Admin_ID },
			req.body,
			{ new: true },
			(err, registro) => {
				if (err) {
					res.send(err);
				}
				res.json(registro);
			}
		);
	}

	public Baja_ID(req: Request, res: Response) {
		Admin.deleteOne({ _id: req.params.Admin_ID }, err => {
			if (err) {
				console.log("object :");
				res.send(err);
			}
			res.json({ message: "Baja_ID Exitosa" });
		});
	}
}
