import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { envUtils } from '../utils/envUtils';

const API_URL = envUtils.getApiBaseUrl();
const X_VERSION = envUtils.getDeploymentVersion();

interface ApiResponse<T> {
	status: string;
	data?: T;
	message?: string;
	code?: number;
}

export class ApiClient {
	private static instance: ApiClient;
	private baseURL: string;

	private constructor() {
		this.baseURL = API_URL || '';
	}

	public static getInstance(): ApiClient {
		if (!ApiClient.instance) {
			ApiClient.instance = new ApiClient();
		}
		return ApiClient.instance;
	}

	private getHeaders(token?: string): Record<string, string> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		// Add x-version header if environment variable is set
		if (X_VERSION) {
			headers['x-version'] = X_VERSION;
		}

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		return headers;
	}

	private handleError(error: unknown): never {
		if (error instanceof AxiosError) {
			const message = error.response?.data?.message || error.message;
			throw new Error(message);
		}
		throw error;
	}

	public async get<T>(
		endpoint: string,
		token?: string,
		config: AxiosRequestConfig = {},
	): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await axios.get(
				`${this.baseURL}${endpoint}`,
				{
					...config,
					headers: this.getHeaders(token),
				},
			);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	public async post<T>(
		endpoint: string,
		data?: Record<string, unknown>,
		token?: string,
		config: AxiosRequestConfig = {},
	): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await axios.post(
				`${this.baseURL}${endpoint}`,
				data,
				{
					...config,
					headers: this.getHeaders(token),
				},
			);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	public async put<T>(
		endpoint: string,
		data?: Record<string, unknown>,
		token?: string,
		config: AxiosRequestConfig = {},
	): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await axios.put(
				`${this.baseURL}${endpoint}`,
				data,
				{
					...config,
					headers: this.getHeaders(token),
				},
			);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	public async delete<T>(
		endpoint: string,
		token?: string,
		config: AxiosRequestConfig = {},
	): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await axios.delete(
				`${this.baseURL}${endpoint}`,
				{
					...config,
					headers: this.getHeaders(token),
				},
			);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}
}
