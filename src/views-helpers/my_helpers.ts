export class clase_my_helpers {
	public isSelected = function (opcion: string, seleccionar: string): string {
		let r = opcion == seleccionar ? "selected" : "";
		// console.log("opcion , seleccionar :", opcion, seleccionar, r);
		return r;
	};

	public JCC = function () {
		return "https://juliocorbaz.000webhostapp.com";
	};
}
