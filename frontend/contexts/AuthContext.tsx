"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string, name: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
	{
		id: "1",
		email: "demo@taletrace.com",
		name: "Demo User",
		avatar:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	},
];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock authentication - accepts any email/password for demo
		const mockUser = mockUsers.find((u) => u.email === email) || {
			id: Date.now().toString(),
			email,
			name: email.split("@")[0],
		};

		setUser(mockUser);
		setIsLoading(false);
	};

	const signup = async (email: string, password: string, name: string) => {
		setIsLoading(true);
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1200));

		// Mock user creation
		const newUser: User = {
			id: Date.now().toString(),
			email,
			name,
		};

		setUser(newUser);
		setIsLoading(false);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
