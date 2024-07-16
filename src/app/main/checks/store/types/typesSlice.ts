export interface AccountBank {
	name: string;
	uid: string;
}

export interface Bank {
	accNumber: string;
	agencyNumber: string;
	cpfOrCnpj: string;
	name: string;
	uid: string;
}

export interface ChecksType {
	uid?: string;
	AccountBank: AccountBank;
	Bank: Bank;
	payerName: string;
	checkNumber: string;
	payerPhone?: string;
	sendTo?: string;
	dueDate: Date;
	value: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface CheckSliceType {
	checks: ChecksType[];
	loading: boolean;
}
