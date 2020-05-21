export class My_Controllers {
	public Capitalizer(cadena: string): string {
		cadena = this.sacar_espacios(cadena).toLowerCase();
		return cadena.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
			return p1 + p2.toUpperCase();
		});
	}

	public sacar_espacios(cadena: string): string {
		let array: string[] = cadena.split(" ");
		let nueva: string = "";
		array.forEach((element) => {
			if (element.length === 1) {
				nueva = `${nueva.trim()}${element} `;
			} else if (element.length > 1) {
				nueva = `${nueva}${element} `;
			}
		});
		return nueva.trim();
	}

	public modal(): void {
		$("#myModal").modal("show");
		setTimeout(function () {
			$("#myModal").modal("hide");
		}, 3000);
	}
}
