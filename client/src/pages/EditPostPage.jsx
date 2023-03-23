import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ align: "" },
			{ align: "center" },
			{ align: "right" },
			{ align: "justify" },
		],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
};

const EditPostPage = () => {
	const { state: post } = useLocation();
	const [title, setTitle] = useState(post.title);
	const [summary, setSummary] = useState(post.summary);
	const [imageFile, setImageFile] = useState(null);
	const [content, setContent] = useState(post.content);
	const navigate = useNavigate();
	const editPostHandler = async e => {
		e.preventDefault();
		const dataForm = new FormData();
		dataForm.set("title", title);
		dataForm.set("summary", summary);
		dataForm.set("imageFile", imageFile);
		dataForm.set("content", content);
		dataForm.set("id", post._id);

		try {
			const response = await fetch("http://localhost:4000/post", {
				method: "PUT",
				body: dataForm,
				credentials: "include",
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data);

			navigate("/my-posts");
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<form onSubmit={editPostHandler} encType="multipart/form-data">
			<div className="flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="title">
					Title
				</label>
				<input
					required
					type="text"
					id="title"
					min={12}
					value={title}
					onChange={e => setTitle(e.target.value)}
					className="input"
				/>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="summary">
					Summary
				</label>
				<input
					required
					type="text"
					id="summary"
					min={12}
					value={summary}
					onChange={e => setSummary(e.target.value)}
					className="input"
				/>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="image">
					Image Cover
				</label>
				<input
					required
					type="file"
					id="image"
					accept="image/*"
					onChange={e => setImageFile(e.target.files[0])}
					className="input"
				/>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="content">
					Context
				</label>
				<ReactQuill
					theme="snow"
					value={content}
					onChange={setContent}
					id="content"
					modules={modules}
					// formats={formats}
				/>
			</div>

			<button className="btn mt-6">Edit Post</button>
		</form>
	);
};
export default EditPostPage;
