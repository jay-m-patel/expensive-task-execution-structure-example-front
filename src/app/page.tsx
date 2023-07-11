"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { socket } from './socket';
import { MyForm } from './components/MyForm';
import TaskView from './components/TaskView';

export interface Task {
  id: string,
  msg: string,
  isDone: boolean,
}

export default function App() {
  const [clientId, setClientId] = useState('');
  const [tasks, setTasks] = useState<Array<Task>>([])

  useEffect(() => {
    setClientId("CLIENT:" + (Math.random() * 1000000).toFixed(0));

    function onConnect() {
      console.log("connected with socket id:", socket.id);
    }

    socket.on('connect', onConnect);

    socket.on("expensive-task-executed", (executedTask: Task) => {
      console.log("expensive-task-executed:", executedTask);

      setTasks(tasks => tasks.map(task => {
        if(task.id === executedTask.id) {
          task.isDone = true;
        }
        return task;
      }));  // setting the tasks array will re-render all TaskView components!
    });


    return () => {
      socket.off('connect', () => console.log("'connect' event listener closed."));
      socket.off('expensive-task-executed', () => console.log("'expensive-task-executed' event listener closed."))
    };
  }, []);

  const appendTask = useCallback((newTask: Task) => {
    setTasks([...tasks, newTask]);
  }, [tasks, setTasks])

  return (
    <div className="App">
      <h1>{clientId}</h1>
      <MyForm appendTask={appendTask} />
      {
        tasks.map((task) => <TaskView task={task} key={task.id} />)
      }
    </div>
  );
}