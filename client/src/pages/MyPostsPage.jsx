import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Posts from "../components/Posts/Posts";

const MyPostsPage = () => {
	const [myPosts, setMyPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch("http://localhost:4000/my-posts", {
					credentials: "include",
				});
				const data = await response.json();

				if (!response.ok) throw new Error(data);

				setIsLoading(false);
				setMyPosts(data);
			} catch (error) {
				setIsLoading(false);
				console.log(error.message);
			}
		};

		sendRequest();
	}, []);

	if (isLoading && myPosts.length === 0)
		return (
			<div className="mt-32 grid place-items-center">
				<ClipLoader color="#10b981" size={64} />
			</div>
		);

	return <Posts posts={myPosts} isLoading={isLoading} />;
};

export default MyPostsPage;
