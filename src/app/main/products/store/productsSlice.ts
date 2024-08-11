import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import { httpClient } from 'src/app/shared/services/api';
import { SchemaProductsType } from '../validation/zod';
import { IProduct, IProductsSlice } from './types';

export const createProduct = createAsyncThunk(
	'products/create',
	async (data: SchemaProductsType, { rejectWithValue }) => {
		const createData = {
			...data,
			value: +data.value,
			cca: +data.cca,
			warranty: +data.warranty,
			quantity: +data.quantity
		};

		const res = await httpClient.doPost<IProduct>('/products', createData);

		if (res.success) {
			return res.data;
		}

		return rejectWithValue('rejected');
	}
);

export const getAllProducts = createAsyncThunk('products/getAll', async (_, { rejectWithValue }) => {
	const res = await httpClient.doGet<IProduct[]>('/products');

	if (res.success) {
		return res.data;
	}

	return rejectWithValue('rejected');
});

const initialState: IProductsSlice = {
	payload: [],
	loading: false
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.payload = action.payload;
			})
});

export const selectProducts = (state: RootState) => state.products;
export type checksSliceType = typeof productsSlice;
