import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { httpClient } from 'src/app/shared/services/api';

interface ICustomerSlice {
	customers: ICustomers[];
	loading: boolean;
}

interface IProductsInternalOrder {
	description: string;
	internalOrderUid: string;
	quantity: string;
	total: string;
	uid: string;
	unityValue: string;
}

interface IInternalOrder {
	uid: string;
	costumerUid: string;
	createdAt: Date;
	orderNumber: string;
	status: string;
	totalValue: string;
	vehicles: string;
	productsInternalOrder: IProductsInternalOrder[];
}

export interface ICustomers {
	uid: string;
	name: string;
	cpfOrCnpj: string;
	address: string;
	phone: string;
	createdAt: Date;
	internalOrder: IInternalOrder[];
}

export const getCustomers = createAsyncThunk('customers/get', async () => {
	const res = await httpClient.doGet<ICustomers[]>('customers');

	if (res.success) {
		return res.data;
	}
	return [];
});

const initialState: ICustomerSlice = {
	loading: false,
	customers: []
};

export const customersSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCustomers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCustomers.fulfilled, (state, action) => {
				state.loading = false;
				state.customers = action.payload;
			});
	}
});

export const selectCustomers = (state: RootState) => state.customers.customers;
export const selectCustomersLoading = (state: RootState) => state.customers.loading;
export default customersSlice.reducer;
