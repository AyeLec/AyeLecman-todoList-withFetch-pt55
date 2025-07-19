import React, { useState, useEffect, useLayoutEffect } from "react";
import TasksList from "./TasksList"

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Make the bed", "Drink water", "Study a lot"])

	const handleDelete = (indexToDelete) => {
		setTasks(prev => prev.filter((_, i) => i !== indexToDelete));
	};

	const addTask = (newTaskText) => {
		if (newTaskText.trim() === "") return;
		const newTask = newTaskText.trim();
		setTasks(prevTasks => [...prevTasks, newTask]);
	};
	

	return (
		<div className="home container-fluid d-flex justify-content-center">
			<TasksList tasks={tasks} handleDelete={handleDelete} addTask={addTask} />
		</div>
	);
};

export default Home;