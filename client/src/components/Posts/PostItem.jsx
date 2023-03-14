import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const PostItem = ({ post }) => {
	const { userInfo } = useAuthContext();

	return (
		<li className="overflow-hidden rounded-lg bg-gray-200 ">
			<Link to={`/post/${post._id}`} state={post}>
				<div>
					<img
						className="w-full object-cover"
						src={`http://localhost:4000/${post.image}`}
						alt=""
					/>
				</div>
				<div className="p-2">
					<h2 className="text-lg font-bold">{post.title}</h2>
					<p className="space-x-2 text-sm">
						<span>
							{userInfo?.id === post.author._id ? "You" : post.author.username}
						</span>
						<time>
							{new Intl.DateTimeFormat("en-US").format(
								new Date(post.createdAt)
							)}
						</time>
					</p>
					<p>{post.summary}</p>
				</div>
			</Link>
		</li>
	);
};
export default PostItem;
