// Interface tutorialsteacher.com/nodejs/nodejs-local-modules
interface Iareas {
	area: string;
	disabled: boolean;
	selected: boolean;
}

export class Schema_Areas {
	AREAS: Array<Iareas> = [
		{
			area: "Seleccione su Area de Trabajo",
			disabled: true,
			selected: false,
		},
		{
			area: "Team player",
			disabled: false,
			selected: false,
		},
		{
			area: "Technical referent",
			disabled: false,
			selected: false,
		},
		{
			area: "Client satisfaction",
			disabled: false,
			selected: false,
		},
		{
			area: "Motivation",
			disabled: false,
			selected: false,
		},
		{
			area: "Fun",
			disabled: false,
			selected: false,
		},
	];
}
