import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { SchemaCheckType } from '../main/checks/components/CreateCheck';

const axiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig<unknown>, unknown, AxiosError> =>
	async ({ url, method, data, params }) => {
		try {
			Axios.defaults.baseURL = 'http://localhost:8080/api/';
			const result = await Axios({
				url,
				method,
				data,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				params
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError as AxiosError;
			return {
				error
			};
		}
	};

interface BankTemp {
	uid: string;
	name: string;
	accNumber: string;
	agencyNumber: string;
}

interface TestTemp {
	Banks: BankTemp[];
	accNumber: string;
	name: string;
	agencyNumber: string;
}

export const apiService = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
	endpoints: builder => ({
		searchChecks: builder.query<TestTemp[], string>({
			query: params => `checks/${params}`
		})
	})
});

export default apiService;
export const { useSearchChecksQuery } = apiService;
