import React, { useState, useEffect, useLayoutEffect } from "react";

//create your first component
const Test = () => {
    function getTask() {
        console.log("getTasks")
        fetch("https://playground.4geeks.com/todo/users/aye_lecman")
            .then((response) => response.json())
            .then((data) => console.log(data.todos))
    }

    function addTask() {
        console.log("addTask")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "label": "tarea desde react",
                "is_done": false
            })
        }

        fetch("https://playground.4geeks.com/todo/todos/aye_lecman", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    function deleteTask() {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/todos/17", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            
    }




    return (
        <>
            <h1>Test</h1>
            <button onClick={getTask}></button>
            <button onClick={addTask}></button>
            <button onClick={deleteTask}></button>
        </>
    )
};

export default Test;