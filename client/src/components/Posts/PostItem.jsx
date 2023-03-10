const PostItem = () => {
	return (
		<li className="overflow-hidden rounded-lg bg-gray-200 ">
			<div>
				<img
					className="w-full object-cover"
					src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
					alt=""
				/>
			</div>
			<div className="p-2">
				<h2 className="text-lg font-bold">
					Lorem ipsum dolor sit amet consectetur.
				</h2>
				<p className="space-x-2 text-sm">
					<span>Dimas</span>
					<time>03-03-2023</time>
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, fuga.
					Beatae, perspiciatis!
				</p>
			</div>
		</li>
	);
};
export default PostItem;
