import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout/Layout";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import MyPostsPage from "./pages/MyPostsPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/create" element={<CreatePostPage />} />
				<Route path="/post/:id" element={<PostDetailPage />} />
				<Route path="/my-posts" element={<MyPostsPage />} />
			</Route>
		</Routes>
	);
};
export default App;
