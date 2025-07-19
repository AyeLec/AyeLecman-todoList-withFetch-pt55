import React, { useState, useEffect, useLayoutEffect } from "react";

const TasksList = ({ tasks, handleDelete, addTask }) => {

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(inputValue);
      setInputValue("");
    }
  };

  return (
    
      <div className="card my-3">
        <div>
          <input type="text" className="form-control form-control-lg custom-shadow rounded-0" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add task & press Enter" />
        </div>
        <ul className="list-group list-group-flush">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center task-preview py-3" style={{ cursor: "default" }}>
              <div className="d-flex align-items-center gap-3 ms-1 ms-sm-5">
                <i className="bi bi-stars fs-6"></i>
                <span>{task}</span>
              </div>
              <button className="btn btn-light btn-sm delete-btn border-0 bg-transparent" onClick={() => handleDelete(index)}>
                <i className="bi bi-trash text-danger"></i>
              </button>
            </li>
          ))}
        </ul>
        <div className="card-footer text-muted fst-italic py-1">
          {tasks.length === 0
            ? "No tasks left, add task!"
            : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} left`}
        </div>
      </div>
    
  );
}

export default TasksList;