import React from 'react'
import { Task } from '../dashboard/page'

function TaskView({ task }: { task: Task }) {
    console.log("TaskView:", task);
    return (
        <div style={{ display: "flex", gap: 20, border: "1px solid grey" }}>
            <div>{task.id}</div>
            <div>{task.msg}</div>
            <div style={{backgroundColor: task.isDone ? "green" : "yellow"}}>{task.isDone ? "Done" : "Pending"}</div>
        </div>
    )
}

export default TaskView