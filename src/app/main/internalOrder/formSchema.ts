import { z } from 'zod';

export const createOrderSchema = z.object({
	type: z.string(),
	date: z.string(),
	costumer: z.string(),
	phone: z.string(),
	address: z.string(),
	vehicles: z.string(),
	cpf: z.string(),
	products: z.array(
		z.object({
			quantity: z.string(),
			description: z.string(),
			unityValue: z.string(),
			total: z.string()
		})
	)
});

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>;

function getDateToday() {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
}

export const defaultValues: TCreateOrderSchema = {
	type: 'order',
	date: getDateToday(),
	costumer: '',
	phone: '',
	address: '',
	vehicles: '',
	products: [{ quantity: '', description: '', unityValue: '', total: '' }]
};
