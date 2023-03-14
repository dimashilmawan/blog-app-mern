import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout/Layout";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import Beler from "./pages/Beler";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/create" element={<CreatePostPage />} />
				<Route path="/post/:id" element={<PostPage />} />
				<Route path="/beler" element={<Beler />} />
			</Route>
		</Routes>
	);
};
export default App;
