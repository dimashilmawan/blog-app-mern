import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthContext } from "../context/AuthContext";

const PostDetailPage = () => {
	const { state: post } = useLocation();
	const { userInfo } = useAuthContext();
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
			<h1 className="text-center text-3xl font-bold capitalize">
				{post.title}
			</h1>
			<p className="text-center">
				by {post.author.username} on ${post.createdAt}
			</p>
			{post.author._id === userInfo.id && (
				<Link
					to={`/edit/${post._id}`}
					state={post}
					className="mx-auto mt-4  rounded-md bg-gray-600 px-3 py-1 text-lg font-semibold text-white"
				>
					Edit Post
				</Link>
			)}

			<div className="mt-4 aspect-video overflow-hidden rounded-md ">
				<img
					className="h-full w-full object-cover object-center"
					src={`http://localhost:4000/${post.image}`}
					alt=""
				/>
			</div>
			<div
				className="mt-4"
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>
		</div>
	);
};
export default PostDetailPage;
