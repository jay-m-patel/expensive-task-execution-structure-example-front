"use client";
import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import { Task } from "../page";

export function MyForm({appendTask, clientId}: {appendTask: (newTask: Task) => void, clientId: string}) {
  const [value, setValue] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask: Task = {
      id: "TASK:" + (Math.random()*1000000).toFixed(0),
      msg: value,
      isDone: false,
    };

    socket.emit('execute-expensive-task', clientId, newTask);

    setValue('');

    appendTask(newTask);
  };

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } value={value} />

      <button type="submit">Start the task</button>
    </form>
  );
}