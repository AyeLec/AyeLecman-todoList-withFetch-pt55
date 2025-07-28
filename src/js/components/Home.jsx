import React, { useState, useEffect } from "react";
import TasksList from "./TasksList";

const USER = "aye_lecman";

// la base se elimina todas las semanas, hacer un condicional, si el usuario no existe, hacer el post
// fetch('examples/example.json')
//     .then(response => {
// 	    if (!response.ok) {
// 	    throw new Error(response.statusText);
// 		}
// 		// Aquí es donde pones lo que quieres hacer con la respuesta
// 	})
// 	.catch(error => {
// 		console.log('Looks like there was a problem: \n', error);
// 	});

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch(`https://playground.4geeks.com/todo/users/${USER}`)
			.then(res => res.json())
			.then(data => setTasks(data.todos))
			.catch(err => setError("Error al cargar tareas"));
	}, []);

	const addTask = (newTaskText) => {
		const text = newTaskText.trim();
		if (!text) return;

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ label: text, is_done: false })
		};

		fetch(`https://playground.4geeks.com/todo/todos/${USER}`, requestOptions)
			.then(res => res.json())
			.then(newTask => {
				setTasks(prev => [...prev, newTask]);
			})
			.catch(err => setError("Error al agregar tarea"));
	};

	const handleDelete = (taskId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, { method: "DELETE" })
			.then(res => {
				if (!res.ok) throw new Error("Error al borrar");
				setTasks(prev => prev.filter(t => t.id !== taskId));
			})
			.catch(err => setError("Error al borrar tarea"));
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
					setTasks([]); // Limpiar localmente
				} else {
					setError("Algunas tareas no se pudieron borrar");
				}
			})
			.catch(err => {
				setError("Error al borrar tareas");
			});
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