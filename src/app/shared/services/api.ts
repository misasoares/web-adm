import _axios, { isAxiosError } from 'axios';

export type ResponseAPIFailure = {
	success: false;
	message: string;
	code?: number;
	invalidFields: {
		field: string;
		messages: string;
	}[];
};
export type ResponseAPI<T = unknown> =
	| {
			success: true;
			data: T;
	  }
	| ResponseAPIFailure;

function customAxios() {
	const axios = _axios.create();

	axios.defaults.baseURL = import.meta.env.VITE_API_KEY;
	axios.interceptors.request.use((config) => {
		const userToken = localStorage.getItem('jwt_access_token');
		const token = `Bearer ${userToken}`;
		config.headers.authorization = token || '';
		return config;
	});
	return {
		async doGet<T = any>(
			url: string,
			options?: {
				params?: Record<string, string>;
				query?: Record<string, string> | URLSearchParams;
				headers?: Record<string, boolean | string>;
			}
		): Promise<ResponseAPI<T>> {
			try {
				const queries = new URLSearchParams(options?.query).toString();

				const response = await axios.get(`${url}${queries ? `?${queries}` : ''}`, {
					...options?.params,
					headers: options?.headers
				});

				return response.data;
			} catch (error) {
				if (isAxiosError<ResponseAPI<T>, Error>(error) && error.response && !error.response.data.success) {
					return {
						success: false,
						code: error.response.status,
						message: error.response.data.message,
						invalidFields: error.response.data.invalidFields
					};
				}
				return {
					code: 500,
					success: false,
					message: 'Erro inesperado, tente novamente mais tarde.',
					invalidFields: []
				};
			}
		},

		doPost: async <T = any>(url: string, data: any): Promise<ResponseAPI<T>> => {
			try {
				const response = await axios.post(url, data);

				return response.data;
			} catch (error) {
				if (isAxiosError<ResponseAPI<T>, Error>(error) && error.response && !error.response.data.success) {
					return {
						success: false,
						code: error.response.status,
						message: error.response.data.message,
						invalidFields: error.response.data.invalidFields
					};
				}
				return {
					success: false,
					code: 500,
					message: 'Erro inesperado, tente novamente mais tarde.',
					invalidFields: []
				};
			}
		},

		doPut: async <T = any>(url: string, data?: any, params?: any): Promise<ResponseAPI<T>> => {
			try {
				const response = await axios.put(url, data, {
					params
				});

				return response.data;
			} catch (error) {
				if (isAxiosError<ResponseAPI<T>, Error>(error) && error.response && !error.response.data.success) {
					return {
						success: false,
						code: error.response.status,
						message: error.response.data.message,
						invalidFields: error.response.data.invalidFields
					};
				}
				return {
					success: false,
					code: 500,
					message: 'Erro inesperado, tente novamente mais tarde.',
					invalidFields: []
				};
			}
		},

		doDelete: async <T = any>(url: string, params?: any): Promise<ResponseAPI<any>> => {
			try {
				const response = await axios.delete(url, { params });

				return response.data;
			} catch (error) {
				if (isAxiosError<ResponseAPI<T>, Error>(error) && error.response && !error.response.data.success) {
					return {
						success: false,
						message: error.response.data.message,
						invalidFields: error.response.data.invalidFields
					};
				}
				return {
					success: false,
					message: 'Erro inesperado, tente novamente mais tarde.',
					invalidFields: []
				};
			}
		},

		doUpload: async <T = any>(url: string, data: any): Promise<ResponseAPI<any>> => {
			try {
				const response = await axios.post(url, data, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});

				return response.data;
			} catch (error) {
				if (isAxiosError<ResponseAPI<T>, Error>(error) && error.response && !error.response.data.success) {
					return {
						success: false,
						message: error.response.data.message,
						invalidFields: error.response.data.invalidFields
					};
				}
				return {
					success: false,
					message: 'Erro inesperado, tente novamente mais tarde.',
					invalidFields: []
				};
			}
		}
	};
}

export const httpClient = customAxios();
