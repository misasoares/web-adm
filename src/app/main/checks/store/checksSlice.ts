import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store/store';

interface ChecksType {
	uid?: string;

	accName: string;
	bank: string;
	accNumber: string;
	agencyNumber: string;
	payerName: string;
	checkNumber: string;
	payerPhone: string;
	sendTo?: string;
	dueDate: Date;
	value: string;

	createdAt?: Date;
	updatedAt?: Date;
}

interface CheckStateType {
	checks: ChecksType[];
	loading: boolean;
}

const initialState: CheckStateType = {
	checks: [],
	loading: false
};

export const checksSlice = createSlice({
	name: 'checks',
	initialState,
	reducers: {
		addCheck(state, action: PayloadAction<ChecksType>) {
			state.checks.push(action.payload);
		}
	}
});

export const { addCheck } = checksSlice.actions;
export const selectChecks = (state: RootState) => state?.checks;
export type checksSliceType = typeof checksSlice;
export default checksSlice.reducer;
