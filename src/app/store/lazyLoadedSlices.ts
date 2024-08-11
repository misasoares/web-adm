import { fuseSettingsSlice } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { combineSlices } from '@reduxjs/toolkit';
import { i18nSlice } from 'app/store/i18nSlice';
import { userSlice } from '../auth/user/store/userSlice';
import { checksSlice } from '../main/checks/store/checksSlice';
import { internalOrderSlice } from '../main/internalOrder/store/internalOrderSlice';
import apiService from './apiService';
import { customersSlice } from '../main/costumers/store/customersSlice';
import { productsSlice } from '../main/products/store/productsSlice';

// eslint-disable-next-line
// @ts-ignore
export interface LazyLoadedSlices {}

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(
	/**
	 * Static slices
	 */
	userSlice,
	checksSlice,
	productsSlice,
	customersSlice,
	internalOrderSlice,
	fuseSettingsSlice,
	i18nSlice,

	/**
	 * Dynamic slices
	 */
	{
		[apiService.reducerPath]: apiService.reducer
	}
).withLazyLoadedSlices<LazyLoadedSlices>();
