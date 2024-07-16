import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpClient } from 'src/app/shared/services/api';
import { RootState } from 'app/store/store';
import { InternalOrderType, InternalOrderSliceType } from './types/typesSlice';
import { TCreateOrderSchema } from '../formSchema';

export const createInternalOrder = createAsyncThunk('internalOrder/create', async (data: TCreateOrderSchema) => {
	const res = await httpClient.doPost<InternalOrderType>(`/internal-order`, data);

	if (res.success) {
		return res.data;
	}
});

export const updateInternalOrder = createAsyncThunk('internalOrder/update', async (data: any) => {
	const res = await httpClient.doPut(`/internal-order`, data);

	if (res.success) {
		return res.data;
	}
});

export const getInternalOrder = createAsyncThunk('internalOrder/get', async () => {
	const res = await httpClient.doGet<InternalOrderType[]>(`/internal-order`);
	if (res.success) {
		return res.data;
	}
});

const initialState: InternalOrderSliceType = {
	payload: [],
	loading: false
};

export const internalOrderSlice = createSlice({
	name: 'internalOrder',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createInternalOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createInternalOrder.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload) {
					state.payload.push(action.payload);
				}
			})
			.addCase(getInternalOrder.fulfilled, (state, action) => {
				state.payload = action.payload;
			});
	}
});

export const selectInternalOrder = (state: RootState) => state.internalOrder.payload;
export default internalOrderSlice.reducer;
