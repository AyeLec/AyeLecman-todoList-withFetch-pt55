import React, { useState, useEffect, useCallback  } from "react";
import TasksList from "./TasksList";

const USER = "aye_lecman";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");

	const loadTasks = useCallback(() => {
		fetch(`https://playground.4geeks.com/todo/users/${USER}`)
			.then(res => {
				if (!res.ok) {
					return fetch(`https://playground.4geeks.com/todo/users/${USER}`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([])
					});
				}
				return res;
			})
			.then(res => res.json())
			.then(data => {
				if (data.todos) {
					setTasks(data.todos);
				} else {
					setTasks([]);
				}
			})
			.catch(() => setError("Error al verificar o crear usuario"));
	}, []); //

	useEffect(() => {
		loadTasks(); 
	}, [loadTasks]);

	const addTask = (newTaskText) => {
		const text = newTaskText.trim();
		if (!text) return;

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ label: text, is_done: false })
		};

		fetch(`https://playground.4geeks.com/todo/todos/${USER}`, requestOptions)
			.then(res => {
				if (!res.ok) throw new Error();      
				loadTasks();                          
			})
			.catch(() => setError("Error al agregar tarea")); 
	};

	const handleDelete = (taskId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, { method: "DELETE" })
			.then(res => {
				if (!res.ok) throw new Error();      
				loadTasks();                          
			})
			.catch(() => setError("Error al borrar tarea")); 
	};

	const deleteAllTasks = () => {
		if (!window.confirm("¿Estás segura de borrar todas las tareas?")) return;

		const ids = tasks.map(task => task.id);

		const deletePromises = ids.map(id =>
			fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			})
		);

		Promise.all(deletePromises)
			.then(responses => {
				const allOk = responses.every(res => res.ok);
				if (allOk) {
					loadTasks(); 
				} else {
					setError("Algunas tareas no se pudieron borrar");
				}
			})
			.catch(() => setError("Error al borrar tareas")); 
	};

	return (
		<div className="home container-fluid d-flex justify-content-center">
			{error && (
				<div className="alert alert-danger w-100" role="alert">
					{error}
				</div>
			)}
			<TasksList tasks={tasks} handleDelete={handleDelete} addTask={addTask} deleteAllTasks={deleteAllTasks} />
		</div>
	);
};

export default Home;