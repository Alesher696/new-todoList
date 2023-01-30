import React, {KeyboardEvent, ChangeEvent, ChangeEventHandler, useRef, useState} from 'react';
import {filterValueProps} from "./App";
// import {FilterValuesType} from "./App";
import './App.css'

type todolistProps = {
    title: string
    filter: filterValueProps
    tasks: Array<TasksProps>
    removeTask: (_id: string) => void
    filteredTask: (value: filterValueProps) => void
    addTask: (title: string) => void
    changeTaskStatus: (TaskId: string, isDone: boolean) => void
}
export type TasksProps = {
    id: string
    title: string
    isDone: boolean

}

export const Todolist = (props: todolistProps) => {
    let taskList

    const [title, setTitle] = useState<string>('')
    const [err, setError] = useState <boolean>(false)
// const ref = useRef<HTMLInputElement>(null)
    const addTask = () => {
        const trimmedTitle = title.trim()

        if (trimmedTitle !== '') {
            props.addTask(title)
            setTitle('')
        } else if (trimmedTitle === ''){
            console.error('Empty string!')
            setError(true)


    }}


    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       err && setError(false)
        setTitle(e.currentTarget.value)

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()


    if (props.tasks.length === 0) {
        taskList = <span>EmptyList</span>
    } else taskList = props.tasks.map(task => {


        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return <li key={task.id} className={task.isDone ? 'taskDone' : 'task'}>
            <input
                onChange={changeTaskStatus}
                type={"checkbox"}
                checked={task.isDone}/>{task.title}
            <button onClick={() => {
                props.removeTask(task.id)
            }}>X
            </button>
        </li>
    })


    return (
        <div>
            <div> {props.title}</div>
            <div><input
                // ref = {ref}
                value={title}
                onChange={onchangeHandler}
                onKeyDown={onKeyDownHandler}
                className={err ? 'input-error' : ''}
            />
                <button onClick={addTask}>+</button>
                {err && <p> Title is empty</p>}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-activeFilter' : ''} onClick={() => {
                    props.filteredTask('all')
                }}>All
                </button>
                <button className={props.filter === 'completed' ? 'btn-activeFilter' : ''} onClick={() => {
                    props.filteredTask('completed')
                }}>Completed
                </button>
                <button className={props.filter === 'active' ? 'btn-activeFilter' : ''} onClick={() => {
                    props.filteredTask('active')
                }}>Active
                </button>
            </div>
        </div>
    )
}

