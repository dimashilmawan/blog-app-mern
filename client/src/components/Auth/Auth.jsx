import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Auth = ({ loginPage }) => {
	const { auth } = useAuthContext();
	const usernameRef = useRef();
	const passwordRef = useRef();

	const isLoginPageText = loginPage ? "Login" : "Register";

	const submitHandler = async e => {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;

		if (
			username == null ||
			username.length === 0 ||
			password == null ||
			password.length === 0
		)
			return;

		await auth(username, password, loginPage);
	};

	return (
		<div className="mx-auto mt-20 rounded-lg p-4 sm:mt-16 sm:max-w-md">
			<h1 className="text-center text-4xl font-bold text-gray-600">
				{isLoginPageText}
			</h1>
			<form className="mt-6 " onSubmit={submitHandler}>
				<div className="flex flex-col gap-2">
					<label className="text-gray-700" htmlFor="username">
						Username
					</label>
					<input
						required
						type="text"
						id="username"
						ref={usernameRef}
						min={4}
						max={16}
						className="input"
					/>
				</div>
				<div className="mt-3 flex flex-col gap-2">
					<label className="text-gray-700" htmlFor="password">
						Password
					</label>
					<input
						required
						type="password"
						id="password"
						ref={passwordRef}
						min={4}
						max={16}
						className="input"
					/>
				</div>
				<button className="btn mt-6">{isLoginPageText}</button>
				<Link
					className="mt-2 block text-center text-emerald-700 underline underline-offset-2 outline-none focus:font-bold focus:text-emerald-500
        "
					to={loginPage ? "/register" : "/login"}
				>
					{loginPage
						? "Don't have an account yet? Register "
						: "Already have an account? Login"}
				</Link>
			</form>
		</div>
	);
};
export default Auth;
