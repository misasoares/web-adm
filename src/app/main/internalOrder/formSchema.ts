import { z } from 'zod';

export const createOrderSchema = z.object({
	type: z.string(),
	date: z.string(),
	costumerName: z.string(),
	phone: z.string(),
	address: z.string(),
	vehicles: z.string(),
	cpfOrCnpj: z.string(),
	products: z.array(
		z.object({
			quantity: z.string(),
			description: z.string(),
			unityValue: z.string(),
			total: z.string()
		})
	),
	observations: z.string().optional(),
	totalValue: z.number().optional()
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
	costumerName: '',
	phone: '',
	address: '',
	vehicles: '',
	products: [{ quantity: '', description: '', unityValue: '', total: '' }]
};
