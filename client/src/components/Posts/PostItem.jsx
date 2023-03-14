import { Link } from "react-router-dom";

const PostItem = ({
	_id,
	title,
	summary,
	content,
	image,
	author,
	createdAt,
	updatedAt,
}) => {
	return (
		<li className="overflow-hidden rounded-lg bg-gray-200 ">
			<Link
				to={`/post/${_id}`}
				state={{
					_id,
					title,
					summary,
					content,
					image,
					author,
					createdAt,
					updatedAt,
				}}
			>
				<div>
					<img
						className="w-full object-cover"
						src={`http://localhost:4000/${image}`}
						alt=""
					/>
				</div>
				<div className="p-2">
					<h2 className="text-lg font-bold">{title}</h2>
					<p className="space-x-2 text-sm">
						<span>{author.username}</span>
						<time>
							{new Intl.DateTimeFormat("en-US").format(new Date(createdAt))}
						</time>
					</p>
					<p>{summary}</p>
				</div>
			</Link>
		</li>
	);
};
export default PostItem;
