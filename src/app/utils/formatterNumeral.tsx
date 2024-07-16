export function formatterNumeral(value: number): string {
	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});

	return formatter.format(value);
}
