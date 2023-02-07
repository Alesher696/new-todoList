import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./todolist";
import {v1} from "uuid";


type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'complete'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const changeFilter = (todoListID: string, FilterValue: FilterType) => {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: FilterValue} : el))
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    const addTask = (todoListID: string, titleTask: string) => {
        const newTask = {id: v1(), title: titleTask, isDone: false}

        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }

    const ChangeTaskStatus = (todoListID: string, taskID: string, checkValue: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: checkValue} : el)
        })
    }

    return (

        <div>
            {todolists.map(el => {
                    const removeTodoList = (todoListID: string) => {
                        setTodolists(todolists.filter(el => el.id !== todoListID))
                        delete tasks[todoListID]
                        setTasks(tasks)
                    }
                    let tasksForTodoList = tasks[el.id]

                    if (el.filter === 'active') {
                        tasksForTodoList = tasks[el.id].filter(el => !el.isDone)
                    } else if (el.filter === 'complete') {
                        tasksForTodoList = tasks[el.id].filter(el => el.isDone)
                    }

                    return (<Todolist
                        key={el.id}
                        title={el.title}
                        todoListID={el.id}
                        tasks={tasksForTodoList}
                        filter={el.filter}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        ChangeTaskStatus={ChangeTaskStatus}
                        removeTodoList={removeTodoList}
                    />)
                }
            )}
        </div>
    );
};

