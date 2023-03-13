import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PostItem from "./PostItem";

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch("http://localhost:4000/posts");
				const data = await response.json();

				if (!response.ok) throw new Error(data);

				setIsLoading(false);
				setPosts(data.posts);
			} catch (error) {
				console.log(error.message);
			}
		};

		sendRequest();
	}, []);

	return (
		<ul className="grid h-full gap-y-3 ">
			{isLoading && posts.length === 0 && (
				<div className="mt-32 grid h-full place-items-center">
					<ClipLoader color="#10b981" size={64} />
				</div>
			)}
			{posts.length > 0 &&
				!isLoading &&
				posts.map(post => <PostItem key={post._id} {...post} />)}
		</ul>
	);
};
export default Posts;
