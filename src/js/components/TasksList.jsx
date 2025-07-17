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
    <div className="task-list">
      {tasks.map(task => (
        <div className="task-preview" key={task.id} >
          <h2>{task.task}</h2>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}

      <label htmlFor="inputTask" className="form-control form-control-lg">Add Task</label>
      <input type="text" id="inputTask" className="form-control" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type and press Enter"/>
    </div>
  );
}

export default TasksList;