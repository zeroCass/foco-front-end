import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import Navigation from './navigation/Navigation'
import AuthProvider from './context/Auth'
import TasksProvider from './context/Tasks'

export default () => {

    return (
        
        <AuthProvider>
            <TasksProvider>
                <Navigation />
            </TasksProvider>
        </AuthProvider>
        // <Navigation />
    )
}  