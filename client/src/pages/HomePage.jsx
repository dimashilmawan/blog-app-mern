import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Posts from "../components/Posts/Posts";

const HomePage = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch("http://localhost:4000/posts");
				const data = await response.json();

				if (!response.ok) throw new Error(data);

				setIsLoading(false);
				setPosts(data);
			} catch (error) {
				setIsLoading(false);
				console.log(error.message);
			}
		};

		sendRequest();
	}, []);

	if (isLoading && posts.length === 0)
		return (
			<div className="mt-32 grid place-items-center">
				<ClipLoader color="#10b981" size={64} />
			</div>
		);

	return <Posts posts={posts} isLoading={isLoading} />;
};
export default HomePage;
