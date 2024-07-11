import { z } from 'zod';

export enum EInternalOrderStatus {
	IN_PROGRESS = 'IN_PROGRESS',
	CONCLUDED = 'CONCLUDED'
}
export enum EInternalOrderType {
	BUDGET = 'BUDGET',
	ORDER = 'ORDER',
	RECEIPT = 'RECEIPT'
}

export const createOrderSchema = z.object({
	type: z.nativeEnum(EInternalOrderType),
	date: z.string(),
	costumerName: z.string(),
	phone: z.string(),
	address: z.string(),
	vehicles: z.string(),
	cpfOrCnpj: z.string(),
	status: z.nativeEnum(EInternalOrderStatus).optional(),
	products: z.array(
		z.object({
			quantity: z.string(),
			description: z.string(),
			unityValue: z.string()
			// total: z.string()
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
	type: EInternalOrderType.ORDER,
	date: getDateToday(),
	costumerName: '',
	phone: '',
	address: '',
	vehicles: '',
	products: [{ quantity: '1', description: '', unityValue: '' }]
};
