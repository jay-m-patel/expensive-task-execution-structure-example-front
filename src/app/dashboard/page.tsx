"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { socket } from '../socket';
import { TaskForm } from './components/TaskForm';
import TaskView from './components/TaskView';
import { useSearchParams } from 'next/navigation';

export interface Task {
  id: string,
  clientId: string,
  msg: string,
  isDone: boolean,
}

const TaskManager = () => {
  const [ socketId, setSocketId ] = useState<string>("");
  const [ tasks, setTasks ] = useState<Array<Task>>([]);  // initial(fetched from db) pending tasks expect 'expensive-task-executed' event!

  const searchcParams = useSearchParams();

  const clientId: string | null = searchcParams.get(("clientId"));
  console.log("clientId:", clientId);

  useEffect(() => {

    function onConnect() {
      console.log("connected with socket id:", socket.id);
      setSocketId(socket.id);
      socket.emit("join-personal-room", clientId);
    }

    socket.on('connect', onConnect);

    socket.on("expensive-task-executed", (executedTask: Task) => {
      console.log("expensive-task-executed:", executedTask, "socket.id", socket.id);

      setTasks(tasks => tasks.map(task => {
        if(task.id === executedTask.id) {
          task.isDone = true;
        }
        return task;
      }));  // setting the tasks array will re-render all TaskView components!
    });

    const appendTask = (newTask: Task) => {
      setTasks(tasks => [...tasks, newTask]);
    }
  
    socket.on("append-new-task", (task: Task) => {
      console.log("append-new-task:", task);
      appendTask(task);
    })
  
    return () => {
      socket.off('connect', () => console.log("'connect' event listener closed."));
      socket.off('append-new-task', () => console.log("'append-new-task' event listener closed."))
      socket.off('expensive-task-executed', () => console.log("'expensive-task-executed' event listener closed."))
    };
  }, []);

  if(!clientId) return <p>Unknown Client!</p>

  return (
    <div className="App">
      <h1>{clientId}</h1>
      <h2>Socket: {socketId}</h2>
      <TaskForm clientId={clientId} />
      {
        tasks.map((task) => <TaskView task={task} key={task.id} />)
      }
    </div>
  );
}

export default TaskManager;