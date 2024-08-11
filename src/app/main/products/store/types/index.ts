export interface IProduct {
	uid: string;
	name: string;
	amper: string;
	cca: number;
	value: number;
	warranty: number;
	quantity: number;
}

export interface IProductsSlice {
	loading: boolean;
	payload: IProduct[];
}
