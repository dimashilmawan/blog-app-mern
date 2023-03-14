import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PostDetailPage = () => {
	const { state: post } = useLocation();
	// const [post, setPost] = useState(null);
	// const [isLoading, setIsLoading] = useState(true);
	// const { id } = useParams();

	// useEffect(() => {
	// 	const sendRequest = async () => {
	// 		try {
	// 			const response = await fetch(`http://localhost:4000/post/${id}`);
	// 			const data = await response.json();

	// 			if (!response.ok) throw new Error(data);

	// 			setIsLoading(false);
	// 			setPost(data.post);
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			console.log(error.message);
	// 		}
	// 	};

	// 	sendRequest();
	// }, [id]);

	// if (isLoading)
	// 	return (
	// 		<div className="mt-32 grid h-full place-items-center">
	// 			<ClipLoader color="#10b981" size={64} />
	// 		</div>
	// 	);

	return (
		<div>
			<div className="aspect-video overflow-hidden rounded-md">
				<img
					className="h-full w-full object-cover object-center"
					src={`http://localhost:4000/${post.image}`}
					alt=""
				/>
			</div>
			<h1 className="mt-4 text-3xl font-bold capitalize">{post.title}</h1>
			<p>
				by {post.author.username} on ${post.createdAt}
			</p>
			<div
				className="mt-4"
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>
		</div>
	);
};
export default PostDetailPage;
