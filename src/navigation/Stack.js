import React, { useContext } from 'react'
import { View, Button, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Drawer from './Drawer'
import BottomTab from './BottomTab'
import { AuthContext } from '../context/Auth'
import CreateTask from '../screens/tasks/CreateTask'
import CreateMission from '../screens/missions/CreateMission'
import AuthScreen from '@screens/auth/AuthScreen'


function Login({ navigation }) {
    const { user, setUser } = useContext(AuthContext)

    return (
        <View>
            <Text>Login</Text>
            <Button
                onPress={() => {
                    navigation.navigate('Register')   
                }}
                title="Go to Register"
            />
            <Button
                onPress={() => {
                    // navigation.navigate('Main')
                    // set the authentication and then display the main route
                    setUser({...user, auth: true})
                }}
                title="Go to Main"
            />
        </View>
    )
}


function Register({ navigation }) {
    return (
        <View>
            <Text>Register</Text>
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Go to Login"
            />
        </View>
    )
}


const Stack = createNativeStackNavigator()

export default () => {
    const { user } = useContext(AuthContext)
    return (
        <Stack.Navigator initialRouteName='AuthScreen'>
        {!user.auth 
            ? <Stack.Group>
                <Stack.Screen name='AuthScreen' component={AuthScreen} options={{ headerShown: false }}/>
            </Stack.Group> 
            : <Stack.Group>
                    <Stack.Screen name='Main' component={Drawer} options={{ headerShown: false }}/>
                    <Stack.Screen name='CreateTask' component={CreateTask} 
                        options={{ title: 'Criar Tarefa', headerTitleAlign:'center' }} />
                    <Stack.Screen name='CreateMission' component={CreateMission} 
                        options={{ title: 'Criar Missão', headerTitleAlign:'center' }} />
            </Stack.Group>
        }
        </Stack.Navigator>
    )
}