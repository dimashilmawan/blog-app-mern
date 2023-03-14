import PostItem from "./PostItem";

const Posts = ({ posts, isLoading }) => {
	return (
		<ul className="grid gap-y-3 ">
			{posts.length > 0 &&
				!isLoading &&
				posts.map(post => <PostItem key={post._id} post={post} />)}
		</ul>
	);
};
export default Posts;
