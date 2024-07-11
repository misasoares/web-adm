import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store/store';
import { InternalOrderType, InternalOrderSliceType } from './types/typesSlice';
import { TCreateOrderSchema } from '../formSchema';

export const createInternalOrder = createAsyncThunk('internalOrder/create', async (data: TCreateOrderSchema) => {
	const res = await axios.post<InternalOrderType>(`${import.meta.env.VITE_API_KEY}/internal-order`, data);

	return res.data.data;
});

export const getInternalOrder = createAsyncThunk('internalOrder/get', async () => {
	const res = await axios.get<InternalOrderType[]>(`${import.meta.env.VITE_API_KEY}/internal-order`);

	return res.data.data;
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

export const selectInternalOrder = (state: RootState) => state.internalOrder;
export default internalOrderSlice.reducer;
