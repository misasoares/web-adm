import { z } from 'zod';

export const defaultValues = {
	name: '',
	value: '',
	amper: '',
	cca: '',
	warranty: '',
	quantity: ''
};
export const schema = z.object({
	name: z.string().min(1, { message: 'É necessário adicionar uma marca.' }),
	value: z.string().min(1, { message: 'É necessário adicionar um valor.' }),
	amper: z.string().min(1, { message: 'É necessário adicionar uma amperagem.' }),
	cca: z.string().min(1, { message: 'É necessário adicionar o CCA.' }),
	warranty: z.string().min(1, { message: 'É necessário adicionar garantia (em meses).' }),
	quantity: z.string().min(1, { message: 'É necessário adicionar uma quantidade.' })
});

export type SchemaProductsType = z.infer<typeof schema>;
