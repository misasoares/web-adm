export interface ProductsOrderType {
	quantity: number;
	description: string;
	unityValue: number;
	total: number;
}

export interface InternalOrderType {
	uid: string;
	type: string;
	costumer: string;
	phone: string;
	address: string;
	vehicles: string;
	totalValue: number;
	products: ProductsOrderType[];
}

export interface InternalOrderSliceType {
	payload: InternalOrderType[];
	loading: boolean;
}
