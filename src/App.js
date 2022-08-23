import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import Navigation from './navigation/Navigation'
import AuthProvider from './context/Auth'
import TarefaProvider from './context/Tarefa'

export default () => {

    return (
        
        <AuthProvider>
            <TarefaProvider>
                <Navigation />
            </TarefaProvider>
        </AuthProvider>
        // <Navigation />
    )
}  