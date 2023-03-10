import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
	return (
		<div className="mx-auto min-h-screen sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-[76rem] 2xl:max-w-7xl">
			<Header />
			<main className="mx-auto mt-2 p-3">
				<Outlet />
			</main>
		</div>
	);
};
export default Layout;
