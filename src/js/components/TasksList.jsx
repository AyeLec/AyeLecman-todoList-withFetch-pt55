import React, { useState } from "react";

const TasksList = ({ tasks, handleDelete, addTask, deleteAllTasks }) => {
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			addTask(inputValue);
			setInputValue("");
		}
	};

	return (
		<div className="card my-3 w-100" style={{ maxWidth: 600 }}>
			<div>
				<input
					type="text"
					className="form-control form-control-lg custom-shadow rounded-0"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Add task & press Enter"
				/>
			</div>

			<ul className="list-group list-group-flush">
				{tasks.map((task) => (
					<li key={task.id} className="list-group-item d-flex justify-content-between align-items-center py-3 task-preview">
						<div className="d-flex align-items-center gap-3 ms-1 ms-sm-5">
							<i className="bi bi-stars fs-6"></i>
							<span>{task.label}</span>
						</div>
						<button className="btn btn-light btn-sm border-0 bg-transparent delete-btn" onClick={() => handleDelete(task.id)}>
							<i className="bi bi-trash text-danger"></i>
						</button>
					</li>
				))}
			</ul>

			<div className="card-footer text-muted fst-italic py-2 d-flex justify-content-between align-items-center">
				{tasks.length === 0
					? "No tasks left, add task!"
					: `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} left`}
          <button className= "btn btn-warning btn-sm" onClick={deleteAllTasks}>Delete all</button>
			</div>
		</div>
	);
};

export default TasksList;