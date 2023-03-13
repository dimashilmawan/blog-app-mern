import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(() => {
		const jsonUserInfo = localStorage.getItem("userInfo");
		if (jsonUserInfo == null) {
			return null;
		} else {
			return JSON.parse(jsonUserInfo);
		}
	});

	const navigate = useNavigate();

	const auth = async (username, password, isLogin) => {
		try {
			const url = `http://localhost:4000/${isLogin ? "login" : "register"}`;

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data);

			if (isLogin) {
				setUserInfo(data);
				localStorage.setItem("userInfo", JSON.stringify(data));
				navigate("/");
			} else {
				navigate("/login");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const logout = async () => {
		const url = "http://localhost:4000/logout";
		try {
			const response = await fetch(url, {
				method: "POST",
				credentials: "include",
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data);
			localStorage.removeItem("userInfo");
			setUserInfo(null);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<AuthContext.Provider value={{ userInfo, auth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => {
	return useContext(AuthContext);
};
