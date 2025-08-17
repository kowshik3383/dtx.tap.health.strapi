'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

interface AuthContextType {
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (token: string, mobileNumber?: string) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	token: null,
	isAuthenticated: false,
	isLoading: true,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			setToken(storedToken);
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const login = (newToken: string, mobileNumber?: string) => {
		localStorage.setItem('token', newToken);
		if (mobileNumber !== undefined) {
			localStorage.setItem('mobileNumber', mobileNumber);
		}
		setToken(newToken);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ token, isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
