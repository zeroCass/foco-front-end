import React, { createContext, useContext, useState } from 'react'
import { Alert } from 'react-native'
import { AuthContext } from '@context/Auth'
import { server } from '../common'
import { TasksContext } from '@context/Tasks'
import axios from 'axios'

export const MissionsContext = createContext({})
const initialState = { missions: [] }
export default ({ children }) => {

    const { user } = useContext(AuthContext)
    const [state, setState] = useState(initialState)
    const { state: { tasks }, setMission } = useContext(TasksContext)
    //initial state handler
    const [initial, setInitial] = useState(false)

    const getMissions = async () => {
        try {
            const response = await axios(`${server}/missions/${user.id}`)
            const missionsData = response.data
            // for each mission
            missionsData.forEach(async mission => {
                mission.tasks = []
                //grab all tasks by misisonId
                const tasksData = await axios.get(`${server}/tasks/mission/${mission.id}`)
                mission.tasks = tasksData.data
                setState({...state, missions: missionsData})
            })
            setState({...state, missions: missionsData})
        }catch(e) {
            console.log(e)
        }
    }

    const addMission = async (mission) => {
        try {
            const response = await axios.post(`${server}/missions`, {...mission})
            const selectedTasks = mission.tasks
            const data = response.data.insertId
            //for each task, set mission id
            tasks.forEach(task => {
                let match = selectedTasks.find(t => t.id === task.id)
                if (match) {
                    setMission(task.id, data)
                }
            })
            getMissions()
        }catch(e) {
            console.log(e)
        }
    }

    const startMission = async (missionId) => {
        const missions = [...state.missions]
        const mission = missions.find(m => m.id === missionId)
        if (mission) {
            try {
                const res = await axios.put(`${server}/missions/${missionId}`, { 
                    attr: ['startAt', 'isActive'], data: [new Date(), true]
                })
                if (res.status === 200)
                    getMissions()
            }catch (e) {
                console.log(e)
            }
        }
        
    }

    const doneMission = async (missionId) => {
        const missions = [...state.missions]
        const mission = missions.find(t => t.id === missionId)
        if (mission) {
            try {
            const res = await axios.put(`${server}/missions/${missionId}`, { 
                attr: ['doneAt', 'isActive'], data: [new Date(), false]
            })
            if (res.status === 200)
                getMissions()
            }catch(e) {
                console.log(e)
            }
            
        }
    }

    const expiredMission = async (missionId) => {
        const missions = [...state.missions]
        const mission = missions.find(t => t.id === missionId)
        if (mission) {
            try {
            const res = await axios.put(`${server}/missions/${missionId}`, { 
                attr: ['expired', 'isActive'], data: [true, false]
            })
            if (res.status === 200) {
                Alert.alert('Tarefa Expirada!', `A tarefa ${mission.name} não foi concluída a tempo`,[
                    { text: 'OK' }
                ], { cancelable: true })
                getMissions()
            }
                
            }catch(e) {
                console.log(e)
            }
            
        }
    }

    const initCountdown = async (missionId) => {
        const missions = [...state.missions]
        const mission = missions.find(t => t.id === missionId)
        if (mission) {
            let until = new Date(mission.initDate).getTime() - new Date().getTime()
            if (until < 0 && mission.doneAt === null && !mission.isActive && !mission.expired) {
                try {
                const res = await axios.put(`${server}/missions/${missionId}`, { 
                    attr: ['startAt', 'isActive'], data: [new Date(), true]
                })
                if (res.status === 200) {
                    Alert.alert('Tarefa Expirada!', `A tarefa ${mission.name} não foi concluída a tempo`,[
                        { text: 'OK' }
                    ], { cancelable: true })
                    getMissions()
                }
                    
                }catch(e) {
                    console.log(e)
                }
            }
        }
    }


    // set the initial state to the TASK
    if (user.id && !initial) {
        getMissions()
        setInitial(true)
    }

    return (
        <MissionsContext.Provider value={{
            state, 
            addMission,
            initCountdown,
            expiredMission,
            doneMission,
            startMission,
            setInitial,
        }} >
            { children }
        </MissionsContext.Provider>
    )
}