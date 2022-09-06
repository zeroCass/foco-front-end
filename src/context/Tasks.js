import React, { createContext, useContext, useReducer, useState } from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { server, showError } from '../common'
import { AuthContext } from '@context/Auth'

export const TasksContext = createContext({})
const initialState = { tasks: []}

export default TasksProvider = ({ children })  => {
    const { user } = useContext(AuthContext)
    const [state, setState] = useState(initialState)
    //initial state handler
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
                        const response = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: ['isActive', 'startAt'],
                            data: [true, new Date()],
                        })
 
                        if (response.status === 200)
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
                        const response = await axios.put(`${server}/tasks/${task.id}`, {
                            attr: ['expired', 'isActive'],
                            data: [true, false],
                        })
                        if (response.status === 200)
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


    const startTask = async (taskId) => {
        const tasks = [...state.tasks]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            const res = await axios.put(`${server}/tasks/${taskId}`, { 
                attr: ['startAt', 'isActive'], data: [new Date(), true]
            })
            if (res.status === 200)
                getTasks()
        }
        
    }

    const doneTask = async (taskId) => {
        const tasks = [...state.tasks]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            const res = await axios.put(`${server}/tasks/${taskId}`, { 
                attr: ['doneAt', 'isActive'], data: [new Date(), false]
            })
            if (res.status === 200)
                getTasks()
        }
    }

    const setMission = async (taskId, missionId) => {
        console.log('setMission', missionId)
        const tasks = [...state.tasks]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            const res = await axios.put(`${server}/tasks/${taskId}`, { 
                attr: ['missionId'], data: [`${missionId}`]
            })
            if (res.status === 200)
                getTasks()
        }
    }


    const setDate2Null = async (taskId) => {
        const tasks = [...state.tasks]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            const res = await axios.put(`${server}/tasks/${taskId}`, { 
                attr: ['estimateDate', 'initDate', 'isActive'], data: [null, null, false]
            })
            if (res.status === 200)
                getTasks()
        }
    }

    const toggleDoneAt = async (taskId) => {
        const tasks = [...state.tasks]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            const res = await axios.put(`${server}/tasks/${taskId}`, { 
                attr: ['doneAt'], data: [task.doneAt ? null : new Date()]
            })
            if (res.status === 200)
                getTasks()
        }
    }

    // set the initial state to the TASK
    if (user.id && !initial) {
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
            doneTask,
            startTask,
            setMission,
            setDate2Null,
            toggleDoneAt,
        }}>
            { children }
        </TasksContext.Provider>
    )
}

