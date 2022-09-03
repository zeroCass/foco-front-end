import React, { createContext, useReducer } from 'react'
import { Alert } from 'react-native'

export const TasksContext = createContext({})

const initialState = { tasks: [] }
export default TasksProvider = ({ children })  => {

    const reducer = (state, action) => {
        switch(action.type) {
            case 'addTask':
                let newTask = action.payload
                // calculate the timeleft until task expire
                let until = newTask.estimateDate.getTime() - new Date().getTime()
                // call the countdown function to initilize the countdown
                // newTask.countdown(until)
                return {
                    ...state, 
                    tasks: [...state.tasks, newTask],
                }
            case 'startTask':
                let tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        // calculate the timeleft until task expire
                        // until = task.estimateDate.getTime() - new Date().getTime()
                        task.isActive = true
                        task.startAt = new Date()
                        // task.countdown(until)
                    }
                })
                return {
                    ...state,
                    tasks: tasks,
                }
            // change this to expired only task id
            case 'expiredTask':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        let until = task.estimateDate.getTime() - new Date().getTime()
                        if (until < 0 && task.doneAt === null && !task.expired) {
                            task.expired = true
                            task.isActive = false
                            Alert.alert('Tarefa Expirada!', `A tarefa ${task.name} não foi concluída a tempo`,[
                                { text: 'OK' }
                            ], { cancelable: true })
                        }
                    }
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'initCountdown':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        let until = task.initDate.getTime() - new Date().getTime()
                        if (until < 0 && task.doneAt === null && !task.isActive && !task.expired) {
                            task.isActive = true
                            task.startAt = new Date()
                            Alert.alert(`Tarefa Iniciada!`, `A tarefa ${task.name} foi iniciada.`,[
                                { text: 'OK' }
                            ], { cancelable: true })
                        }
                    }   
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'doneTask':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        task.doneAt = new Date()
                        task.isActive = false
                    }
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'setMission':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        task.missionId = action.payload.missionId
                    }  
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'setDate2Null':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        task.estimateDate = null
                        task.initDate = null
                    }
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'toggleDoneAt':
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        // console.log('toggleDoneAt', task.doneAt)
                        task.doneAt ? task.doneAt = null : task.doneAt = new Date()
                    }
                })
                return {
                    ...state,
                    tasks: tasks
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <TasksContext.Provider value={{
            state, dispatch
        }}>
            { children }
        </TasksContext.Provider>
    )
}

