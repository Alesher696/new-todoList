import React, {useState} from 'react';
import './App.css';
import {TasksProps, Todolist} from "./todolist";
import {v1} from "uuid";

export type filterValueProps = 'all' | 'active' | 'completed'
export const App = () => {



    const [tasks, setTasks] = useState<Array<TasksProps>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'JSX', isDone: false}
    ])

    const [filter, setFilter] = useState<filterValueProps>("all")

    let filteredTasks = tasks
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    } else if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    const filteredTask = (value: filterValueProps) => {
        setFilter(value)

    }


    const removeTask = (_id: string) => {
        setTasks(filteredTasks.filter(task => _id !== task.id))
    }
const addTask = (title: string)=>{
        const newTask: TasksProps = {
            // id: Number(new Date()),
            // поигрпаться
            // yarn add uuid      yarn add @types/uuid
            //установили библиотеку для айдишника, его генерации
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
}

    const changeTaskStatus = (TaskId: string, isDone: boolean)=>{
        setTasks(tasks.map( t => t.id === TaskId ? {...t, isDone: isDone} : t))
    }

    return (
        <div>
            <Todolist
                title={"What's Learn?"}
                tasks={filteredTasks}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask ={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>

    )
}




