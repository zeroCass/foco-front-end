import React, { createContext, useReducer } from 'react'
import { Alert } from 'react-native'

export const MissionsContext = createContext({})
const initialState = { missions: [] }
export default ({ children }) => {
    const reducer = (state, action) => {
        switch(action.type){
            case 'addMission':
                let newMission = action.payload               
                return {
                    ...state,
                    missions: [...state.missions, newMission]
                }
            case 'startMission':
                let missions = [...state.missions]
                missions.forEach(mission => {
                    if (mission.id === action.payload.id) {
                        mission.isActive = true
                        mission.startAt = true
                    }
                })
                return {
                    ...state,
                    missions,
                }
            case 'expiredMission':
                missions = [...state.missions]
                missions.forEach(mission => {
                    if (mission.id === action.payload.id) {
                        let until = mission.estimateDate.getTime() - new Date().getTime()
                        if (until < 0 && mission.doneAt === null && !mission.expired) {
                            mission.expired = true
                            mission.isActive = false
                            Alert.alert('Missão Expirada!', `A missão ${mission.name} não foi concluída a tempo`,[
                                { text: 'OK' }
                            ], { cancelable: true })
                        }
                    }
                })
                return {
                    ...state,
                    missions: missions
                }
            case 'initCountdown':
                missions = [...state.missions]
                missions.forEach(mission => {
                    if (mission.id === action.payload.id) {
                        let until = mission.initDate.getTime() - new Date().getTime()
                        if (until < 0 && mission.doneAt === null && !mission.isActive && !mission.expired) {
                            mission.isActive = true
                            mission.startAt = new Date()
                            Alert.alert(`Missão Iniciada!`, `A missão ${mission.name} foi iniciada.`,[
                                { text: 'OK' }
                            ], { cancelable: true })
                        }
                    }   
                })
                return {
                    ...state,
                    missions: missions
                }
            case 'doneMission':
                missions = [...state.missions]
                missions.forEach(mission => {
                    if (mission.id === action.payload.id) {
                        mission.doneAt = new Date()
                        mission.isActive = false
                    }
                })
                return {
                    ...state,
                    missions: missions
                }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <MissionsContext.Provider value={{
            state, dispatch
        }} >
            { children }
        </MissionsContext.Provider>
    )
}