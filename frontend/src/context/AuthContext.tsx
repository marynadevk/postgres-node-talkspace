import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IAuthUser } from "./interfaces/IAuthUser";
import { IAuthContext } from './interfaces/IAuthContext';

const AuthContext = createContext<IAuthContext>({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<IAuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAuthUser = async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error);
				}
				setAuthUser(data);
			} catch (error: any) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAuthUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ authUser, isLoading, setAuthUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
