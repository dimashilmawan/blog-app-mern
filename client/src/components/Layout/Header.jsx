import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className=" flex items-center justify-between p-3">
			<Link className="text-xl font-bold text-gray-700" to="/">
				My Blog
			</Link>
			<nav className="">
				<Link
					className="block rounded-lg bg-emerald-500 px-4 py-1 text-lg font-semibold text-gray-50"
					to="/login"
				>
					Login
				</Link>
			</nav>
		</header>
	);
};
export default Header;
