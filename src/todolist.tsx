import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "./App";


type TodolistPropsType = {
    title: string
    todoListID: string
    tasks: TasksType[]
    filter: FilterType
    changeFilter: (TodoListID: string, FilterValue: FilterType) => void
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, titleTask: string) => void
    ChangeTaskStatus: (todoListID: string, taskID: string, checkValue: boolean) => void
    removeTodoList: (TodoListID: string) => void
}


export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)


    const ChangeFilterHandler = (todoListID: string, value: FilterType) => {
        props.changeFilter(todoListID, value)
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addTaskHandler = (todoListID: string, title: string) => {
        const trimmableTitle = title.trim()
        if (trimmableTitle === '') {
            setError(true)
        } else {
            props.addTask(todoListID, title)
            setTitle('')

        }

    }

    const removeTodoListHandler = (todolistID: string) => {
        props.removeTodoList(todolistID)
    }

    const onKeyDownHanlder = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler(props.todoListID, title)
    }

    return (
        <div className={'Todolist'}>

            <div className={'TodolistTitle'}>
                {props.title}
                <button onClick={() => removeTodoListHandler(props.todoListID)}
                        className={'btnRemoveTodo'}
                ></button>
            </div>

            <div>
                <input className={error ? 'input-error' : ''} value={title} onChange={onChangeHandler}
                       placeholder={error ? "Empty" : 'Enter your task'} onKeyDown={onKeyDownHanlder}/>
                <button className={'btnAddTask'} onClick={() => addTaskHandler(props.todoListID, title)}></button>
            </div>
            <div className={'taskList'}>
                {props.tasks.map(el => {

                    const removeTaskHandler = (todoListID: string, taskID: string) => {
                        props.removeTask(todoListID, taskID)
                    }

                    const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeTaskStatus(props.todoListID, el.id, e.currentTarget.checked)
                    }
                    return (<li key={el.id}>
                        <input className={''}
                               onChange={ChangeTaskStatusHandler}
                               type={'checkbox'}
                               checked={el.isDone}/>
                        {el.title}
                        <button className={'btnRemoveTask'}
                                onClick={() => removeTaskHandler(props.todoListID, el.id)}></button>
                    </li>)
                })}
            </div>


            <div>
                <button className={props.filter === 'all' ? 'btn-activeFilter' : 'btn'}
                        onClick={() => {
                            ChangeFilterHandler(props.todoListID, 'all')
                        }}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-activeFilter' : 'btn'}
                        onClick={() => {
                            ChangeFilterHandler(props.todoListID, 'active')
                        }}>Active
                </button>
                <button className={props.filter === 'complete' ? 'btn-activeFilter' : 'btn'}
                        onClick={() => {
                            ChangeFilterHandler(props.todoListID, 'complete')
                        }}>Complete
                </button>
            </div>
        </div>
    );
};

