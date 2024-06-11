"use client";

import React, { useState } from "react";

const Page = () => {
	const [task, setTask] = useState("");
	const [desc, setDesc] = useState("");
	const [mainTask, setMainTask] = useState([]);

	const submitHandler = (e) => {
		e.preventDefault();
		setTask("");
		setDesc("");
		setMainTask([...mainTask, { task, desc, completed: false }]);
	};

	const deleteHandler = (idx) => {
		let copyTask = [...mainTask];
		copyTask.splice(idx, 1);
		setMainTask(copyTask);
	};

	const completeHandler = (idx) => {
		let copyTask = [...mainTask];
		copyTask[idx].completed = !copyTask[idx].completed;
		setMainTask(copyTask);
	};

	let renderTask = <h2>No Task Available</h2>;
	if (mainTask.length > 0) {
		renderTask = mainTask.map((t, idx) => {
			return (
				<li
					key={idx}
					className={`flex justify-between items-center px-5 py-2 mb-3 ${
						t.completed ? "bg-gray-300" : "bg-white"
					}`}>
					<div className="flex justify-between w-2/3">
						<h4
							className={`text-xl font-bold ${
								t.completed ? "text-gray-500" : "text-black"
							}`}>
							{t.task}
						</h4>
						<h6
							className={`text-lg ${
								t.completed ? "text-gray-500" : "text-black"
							}`}>
							{t.desc}
						</h6>
					</div>
					<button
						onClick={() => {
							completeHandler(idx);
						}}
						className={`py-2 px-6 text-base font-bold rounded ${
							t.completed
								? "bg-yellow-500 text-white"
								: "bg-green-500 text-white"
						}`}>
						{t.completed ? "Undo" : "Complete"}
					</button>
					<button
						onClick={() => {
							deleteHandler(idx);
						}}
						className="bg-red-500 py-2 px-6 text-base text-white font-bold rounded">
						Remove
					</button>
				</li>
			);
		});
	}

	return (
		<>
			<h1 className="bg-gray-600 text-white p-5 text-4xl font-bold text-center">
				Todo List
			</h1>
			<form
				onSubmit={submitHandler}
				className="mt-3 ml-12 flex items-center flex-col">
				<input
					className="border-2 rounded text-xl border-black p-2 mb-5"
					type="text"
					placeholder="Enter your Task here..."
					value={task}
					onChange={(e) => {
						setTask(e.target.value);
					}}
				/>
				<input
					className="border-2 rounded text-xl border-black p-2 mb-5"
					type="text"
					placeholder="Enter your Description here..."
					value={desc}
					onChange={(e) => {
						setDesc(e.target.value);
					}}
				/>
				<button className="bg-black text-white py-3 px-20 text-xl font-bold rounded">
					Add Task
				</button>
			</form>

			<hr className="mt-2" />
			<ul className="bg-slate-100 text-center mt-2">{renderTask}</ul>
		</>
	);
};

export default Page;
