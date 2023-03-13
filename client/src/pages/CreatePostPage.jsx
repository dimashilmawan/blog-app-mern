import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link"],
		["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
];

const CreatePostPage = () => {
	const titleRef = useRef();
	const summaryRef = useRef();
	const contentRef = useRef();
	const imageFileRef = useRef();

	const navigate = useNavigate();

	const createPostHandler = async e => {
		e.preventDefault();
		const title = titleRef.current?.value;
		const summary = summaryRef.current?.value;
		const imageFile = imageFileRef.current?.files[0];
		const content = contentRef.current?.value;

		const dataForm = new FormData();
		dataForm.set("title", title);
		dataForm.set("summary", summary);
		dataForm.set("imageFile", imageFile);
		dataForm.set("content", content);

		try {
			const response = await fetch("http://localhost:4000/post", {
				method: "POST",
				body: dataForm,
				credentials: "include",
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data);

			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<form onSubmit={createPostHandler} encType="multipart/form-data">
			<div className="flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="title">
					Title
				</label>
				<input
					required
					type="text"
					id="title"
					ref={titleRef}
					min={6}
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
					ref={summaryRef}
					min={4}
					max={16}
					className="input"
				/>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="image">
					Image
				</label>
				<input
					required
					type="file"
					ref={imageFileRef}
					id="image"
					accept="image/*"
					className="input"
				/>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<label className="text-gray-700" htmlFor="content">
					Context
				</label>
				<ReactQuill
					theme="snow"
					ref={contentRef}
					id="content"
					modules={modules}
					formats={formats}
				/>
			</div>

			<button className="btn mt-6">Create Post</button>
		</form>
	);
};
export default CreatePostPage;
