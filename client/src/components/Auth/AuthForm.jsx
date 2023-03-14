import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthContext } from "../../context/AuthContext";

const AuthForm = ({ loginPage }) => {
	const { login, register } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
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

		setIsLoading(true);

		try {
			if (loginPage) {
				await login(username, password);
			} else {
				await register(username, password);
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	};

	if (isLoading)
		return (
			<div className="fixed top-0 right-0 z-20 grid h-screen w-full place-items-center ">
				<ClipLoader color="#10b981" size={64} />
			</div>
		);

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
				{error && (
					<div className="mt-3 w-full rounded-md bg-red-400 p-2 text-center text-lg text-red-100">
						{error}
					</div>
				)}
				<Link
					className="mt-2 block text-center text-gray-500 focus:font-bold focus:text-emerald-500
        "
					to={loginPage ? "/register" : "/login"}
				>
					{loginPage ? (
						<p>
							Don't have an account yet?
							<span className="font-semibold text-emerald-600 underline underline-offset-2 outline-none">
								Register
							</span>
						</p>
					) : (
						<p>
							Already have an account?
							<span className="font-semibold text-emerald-600 underline underline-offset-2 outline-none">
								Login
							</span>
						</p>
					)}
				</Link>
			</form>
		</div>
	);
};
export default AuthForm;
