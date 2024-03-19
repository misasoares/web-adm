import { combineSlices } from '@reduxjs/toolkit';
import { fuseSettingsSlice } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { i18nSlice } from 'app/store/i18nSlice';
import apiService from './apiService';
import { userSlice } from '../auth/user/store/userSlice';
import { checksSlice } from '../main/checks/store/checksSlice';

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
	fuseSettingsSlice,
	i18nSlice,
	/**
	 * Dynamic slices
	 */
	{
		[apiService.reducerPath]: apiService.reducer
	}
).withLazyLoadedSlices<LazyLoadedSlices>();
