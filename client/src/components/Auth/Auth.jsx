import { Link } from "react-router-dom";

const Auth = ({ loginPage }) => {
	const isLoginPageText = loginPage ? "Login" : "Register";

	return (
		<div className="mx-auto mt-20 rounded-lg p-4 sm:mt-16 sm:max-w-md">
			<h1 className="text-center text-4xl font-bold text-gray-600">
				{isLoginPageText}
			</h1>
			<form className="mt-6 ">
				<div className="flex flex-col gap-2">
					<label className="text-gray-700" htmlFor="username">
						Username
					</label>
					<input
						required
						type="text"
						id="username"
						className="rounded-md bg-gray-100  px-2 py-2 outline-none focus:ring-1 focus:ring-emerald-600 focus:ring-offset-2"
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
						className="rounded-md bg-gray-100  px-2 py-2 outline-none  focus:ring-1 focus:ring-emerald-600 focus:ring-offset-2"
					/>
				</div>
				<button
					className="mt-6 w-full rounded-md bg-emerald-500 p-2 text-center text-lg font-bold text-white outline-none hover:bg-opacity-80 focus:ring-1 focus:ring-emerald-600 focus:ring-offset-2 sm:text-base
        "
				>
					{isLoginPageText}
				</button>
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
