import { z } from 'zod';

export const schemaZod = z.object({
	accName: z.string().min(2, 'É necessário adicionar o nome da conta.'),
	bank: z.string().min(2, 'É necessário adicionar o banco.'),
	accNumber: z.string().min(2, 'É necessário adicionar o número de conta.'),
	agencyNumber: z.string().min(2, 'É necessário adicionar a agência.'),
	payerName: z.string().min(2, 'É necessário adicionar o pagador.'),
	checkNumber: z.string().min(2, 'É necessário adicionar o número do cheque.'),
	payerPhone: z.string().optional(),
	cpfOrCnpj: z.string().min(2, 'É necessário adicionar CPF ou CNPJ.'),
	sendTo: z.string().optional(),
	dueDate: z.date({
		required_error: 'É necessário adicionar uma data de vencimento.',
		invalid_type_error: 'É necessário adicionar uma data de vencimento.'
	}),
	value: z.string().min(1, 'É necessário adicionar o valor.')
});

export type SchemaCheckType = z.infer<typeof schemaZod>;

export interface IBank {
	uid: string;
	accNumber: string;
	accountBankUid: string;
	cpfOrCnpj: string;
	agencyNumber: string;
	name: string;
}

export interface IAccountBank {
	name: string;
	Banks: IBank[];
}

export interface IAxiosResponseGet {
	data: IAccountBank[];
	status: number;
}

export interface IPayerName {
	uid: string;
	name: string;
	phone: string;
}
