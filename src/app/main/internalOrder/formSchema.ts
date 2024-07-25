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
	costumerName: z.string().min(3, { message: 'É necessário adicionar um cliente.' }),
	phone: z.string().min(3, { message: 'É necessário adicionar um telefone.' }),
	address: z.string(),
	vehicles: z.string(),
	cpfOrCnpj: z.string(),
	status: z.nativeEnum(EInternalOrderStatus).optional(),
	products: z.array(
		z.object({
			quantity: z.number(),
			description: z.string(),
			unityValue: z.string(),
			discount: z.string().optional(),
			total: z.string().optional()
		})
	),
	observations: z.string().optional(),
	totalValue: z.number().optional(),
	orderNumber: z.string()
});

export type TCreateOrderSchema = z.infer<typeof createOrderSchema>;

const getDateToday = () => {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day}/${month.toString().padStart(2, '0')}/${year}`;
};

export const defaultValues: TCreateOrderSchema = {
	type: EInternalOrderType.ORDER,
	date: getDateToday(),
	costumerName: '',
	phone: '',
	address: '',
	vehicles: '',
	products: [
		{
			quantity: 1,
			description: '',
			unityValue: '',
			total: ''
		}
	],
	orderNumber: ''
};
