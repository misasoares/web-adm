import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';
import axios from 'axios';
import { SchemaCheckType } from '../types/ChecksFormTypes';
import { CheckSliceType, ChecksType } from './types/typesSlice';

export const addChecks = createAsyncThunk('checks/addChecks', async (data: SchemaCheckType) => {
	const res = await axios.post<ChecksType>(`${import.meta.env.VITE_API_KEY}/checks`, data);

	return res.data.data;
});

export const updateCheck = createAsyncThunk('checks/updateCheck', async (data: SchemaCheckType) => {
	const res = await axios.put<ChecksType>(`${import.meta.env.VITE_API_KEY}/checks/${data.uid}`, data);
	return res.data.data;
});

export const getChecks = createAsyncThunk('checks/getChecks', async () => {
	const res = await axios.get<ChecksType[]>(`${import.meta.env.VITE_API_KEY}/checks`);

	return res.data.data;
});

const initialState: CheckSliceType = {
	checks: [],
	loading: false
};

export const checksSlice = createSlice({
	name: 'checks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addChecks.pending, (state) => {
				state.loading = true;
			})
			.addCase(addChecks.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload) {
					state.checks.push(action.payload);
				}
			})
			.addCase(updateCheck.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateCheck.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					const findIndex = state.checks.findIndex((check) => check.uid === action.payload.uid);
					if (findIndex !== -1) {
						state.checks[findIndex] = action.payload;
					}
				}
			})
			.addCase(getChecks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getChecks.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload) {
					state.checks = action.payload;
				}
			});
	}
});

export const selectChecks = (state: RootState) => state.checks;
export type checksSliceType = typeof checksSlice;
export default checksSlice.reducer;
