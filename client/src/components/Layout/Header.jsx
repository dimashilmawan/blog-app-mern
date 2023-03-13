import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
	const { userInfo, logout } = useAuthContext();
	return (
		<header className=" flex items-center justify-between p-3">
			<Link className="text-xl font-bold text-gray-700" to="/">
				My Blog
			</Link>
			<nav className="flex gap-2">
				{userInfo && (
					<>
						<Link to="/create">{userInfo.username}</Link>
						<button onClick={() => logout()}>Logout</button>
					</>
				)}
				{!userInfo && (
					<Link
						className="block rounded-lg bg-emerald-500 px-4 py-1 text-lg font-semibold text-gray-50"
						to="/login"
					>
						Login
					</Link>
				)}
			</nav>
		</header>
	);
};
export default Header;
