export interface ProductsOrderType {
	uid: string;
	quantity: number;
	description: string;
	unityValue: number;
	total: number;
	internalOrderUid: string;
}

export interface ICostumer {
	uid: string;
	name: string;
	cpfOrCnpj: string;
	address: string;
	phone: string;
}

export interface InternalOrderType {
	uid: string;
	type: string;
	costumer: ICostumer;
	status: string;
	vehicles: string;
	totalValue: number;
	products: ProductsOrderType[];
}

export interface InternalOrderSliceType {
	payload: InternalOrderType[];
	loading: boolean;
}
