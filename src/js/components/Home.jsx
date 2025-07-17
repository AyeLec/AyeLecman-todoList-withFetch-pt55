import React, { useState, useEffect, useLayoutEffect } from "react";
import TasksList from "./TasksList"

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([
		{ task: "Make the bed", id: 1 },
		{ task: "Drink water", id: 2 },
		{ task: "Study a lot", id: 3 }
	])

	const handleDelete = (id) => {
		const newTasks = tasks.filter(task => task.id !== id);
		setTasks(newTasks);
	};

	const addTask = (newTaskText) => {
		if (newTaskText.trim() === "") return;
		const newTask = {
			task: newTaskText,
			id: Date.now() // genera un id único
		};
		setTasks(prevTasks => [...prevTasks, newTask]);
	};

	return (
		<div className="home">
			<TasksList tasks={tasks} handleDelete={handleDelete} addTask={addTask} />
		</div>
	);
};

export default Home;