import React, { createContext, useContext, useReducer, useState } from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { server, showError } from '../common'
import { AuthContext } from '@context/Auth'

export const TasksContext = createContext({})
let first = true
const initialState = { tasks: []}

export default TasksProvider = ({ children })  => {
    const { user } = useContext(AuthContext)
    const [state, setState] = useState(initialState)
    const [initial, setInitial] = useState(false)

    const addTask = async (task) => {
        try {
            const response = await axios.post(`${server}/tasks`, {...task})
            getTasks()
        }catch(e) {
            console.log(e)
        }
        
    }

    const getTasks = async () => {
        try {
            const response = await axios(`${server}/tasks/${user.id}`)
            setState({...state, tasks: response.data})
        }catch(e) {
            console.log(e)
        }
    }

    const initCountdown = (taskId) => {
        console.log('initCOutndown')
        const tasks = [...state.tasks]
        tasks.forEach(async task => {
            if (task.id === taskId) {
                let until = new Date(task.initDate).getTime() - new Date().getTime()
                if (until < 0 && task.doneAt === null && !task.isActive && !task.expired) {
                    try {
                        const isActive = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: 'isActive',
                            data: true,
                        })
                        // mark as inactive
                        const startAt = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: 'startAt',
                            data: new Date(),
                        })
                        console.log('startStatus:', startAt.status, isActive.status)
                        if (startAt.status === 200 && isActive.status === 200)
                            getTasks() 
                    }catch(e) {
                        console.log('initcountdown', e)
                    }
                    Alert.alert(`Tarefa Iniciada!`, `A tarefa ${task.name} foi iniciada.`,[
                        { text: 'OK' }
                    ], { cancelable: true })
                }
            }   
        })
    }

    const expiredTask = (taskId) => {
        console.log('expiredTask')
        const tasks = [...state.tasks]
        tasks.forEach(async task => {
            if (task.id === taskId) {
                let until = new Date(task.estimateDate).getTime() - new Date().getTime()
                if (until < 0 && task.doneAt === null && !task.expired) {

                    try {
                        // mark as expired task
                        const expired = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: 'expired',
                            data: true,
                        })
                        // mark as inactive
                        const isActive = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: 'isActive',
                            data: false,
                        })
                        console.log('expired:', expired.status)
                        if (expired.status === 200 && isActive.status === 200)
                            getTasks()
                    } catch(e) {
                        console.log(e)
                    }
                    Alert.alert('Tarefa Expirada!', `A tarefa ${task.name} não foi concluída a tempo`,[
                        { text: 'OK' }
                    ], { cancelable: true })
                }
            }
        })
    }


    const startTask = (taskId) => {
        const tasks = [...state.tasks]
        tasks.forEach(async task => {
            if (task.id === taskId) {
                try {
                    await axios.put(`${server}/tasks/id`, { attr: 'startAt', data: new Date() })
                    await axios.put(`${server}/tasks/id`, { attr: 'isActive', data: true })
                    getTasks()
                }catch(e) {
                    console.log(e)
                }
            }
        })
    }

    // const reducer = (state, action) => {
    //     switch(action.type) {
    //         case 'addTask':
    //             let newTask = action.payload
    //             // calculate the timeleft until task expire
    //             let until = newTask.estimateDate.getTime() - new Date().getTime()
    //             // call the countdown function to initilize the countdown
    //             // newTask.countdown(until)
    //             axios.post(`${server}/tasks`, {...newTask}).then(res => console.log(res.data))
    //             return {
    //                 ...state, 
    //                 tasks: [...state.tasks, newTask],
    //             }
    //         case 'startTask':
    //             let tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     // calculate the timeleft until task expire
    //                     // until = task.estimateDate.getTime() - new Date().getTime()
    //                     task.isActive = true
    //                     task.startAt = new Date()
    //                     // task.countdown(until)
    //                 }
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks,
    //             }
    //         // change this to expired only task id
    //         case 'expiredTask':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     let until = task.estimateDate.getTime() - new Date().getTime()
    //                     if (until < 0 && task.doneAt === null && !task.expired) {
    //                         task.expired = true
    //                         task.isActive = false
    //                         Alert.alert('Tarefa Expirada!', `A tarefa ${task.name} não foi concluída a tempo`,[
    //                             { text: 'OK' }
    //                         ], { cancelable: true })
    //                     }
    //                 }
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         case 'initCountdown':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     let until = task.initDate.getTime() - new Date().getTime()
    //                     if (until < 0 && task.doneAt === null && !task.isActive && !task.expired) {
    //                         task.isActive = true
    //                         task.startAt = new Date()
    //                         Alert.alert(`Tarefa Iniciada!`, `A tarefa ${task.name} foi iniciada.`,[
    //                             { text: 'OK' }
    //                         ], { cancelable: true })
    //                     }
    //                 }   
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         case 'doneTask':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     task.doneAt = new Date()
    //                     task.isActive = false
    //                 }
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         case 'setMission':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     task.missionId = action.payload.missionId
    //                 }  
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         case 'setDate2Null':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     task.estimateDate = null
    //                     task.initDate = null
    //                 }
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         case 'toggleDoneAt':
    //             tasks = [...state.tasks]
    //             tasks.forEach(task => {
    //                 if (task.id === action.payload.id) {
    //                     // console.log('toggleDoneAt', task.doneAt)
    //                     task.doneAt ? task.doneAt = null : task.doneAt = new Date()
    //                 }
    //             })
    //             return {
    //                 ...state,
    //                 tasks: tasks
    //             }
    //         default:
    //             return state
    //     }
    // }

    //const [state, dispatch] = useReducer(reducer, initialState)

    if (user.id && !initial) {
        console.log('ENTROU AQUI')
        getTasks()
        setInitial(true)
    }
    return (
        <TasksContext.Provider value={{
            state, 
            addTask, 
            getTasks, 
            expiredTask,
            initCountdown,
            setInitial,
        }}>
            { children }
        </TasksContext.Provider>
    )
}

