import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(() => {
		const jsonUserInfo = localStorage.getItem("userInfo");

		if (jsonUserInfo == null || jsonUserInfo === "undefined") {
			return null;
		} else {
			return JSON.parse(jsonUserInfo);
		}
	});

	const navigate = useNavigate();
	const register = async (username, password) => {
		try {
			const url = `http://localhost:4000/register`;

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: { "Content-Type": "application/json" },
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data);

			navigate("/login");
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const login = async (username, password) => {
		try {
			const url = "http://localhost:4000/login";

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data);
			console.log(data);
			setUserInfo(data);

			localStorage.setItem("userInfo", JSON.stringify(data));

			navigate("/");
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const logout = async () => {
		const url = "http://localhost:4000/logout";
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) throw new Error(data);

			localStorage.removeItem("userInfo");
			setUserInfo(null);
		} catch (error) {
			throw new Error(error.message);
		}
	};

	return (
		<AuthContext.Provider value={{ userInfo, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => {
	return useContext(AuthContext);
};
