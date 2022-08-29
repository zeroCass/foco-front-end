import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import Navigation from './navigation/Navigation'
import AuthProvider from './context/Auth'
import TasksProvider from './context/Tasks'
import MissionProvider from './context/Missions'

export default () => {

    return (
        
        <AuthProvider>
            <TasksProvider>
                <MissionProvider>
                    <Navigation />
                </MissionProvider>    
            </TasksProvider>
        </AuthProvider>
        // <Navigation />
    )
}  