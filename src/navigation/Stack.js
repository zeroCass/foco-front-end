import React, { useContext } from 'react'
import { View, Button, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Drawer from './Drawer'
import BottomTab from './BottomTab'
import { AuthContext } from '../context/Auth'
import RegisterTask from '../screens/tasks/RegisterTask'
import CreateMission from '../screens/missions/CreateMission'



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
        <Stack.Navigator initialRouteName='Login'>
        {!user.auth 
            ? <Stack.Group>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
            </Stack.Group> 
            : <Stack.Group>
                    <Stack.Screen name='Main' component={Drawer} options={{ headerShown: false }}/>
                    <Stack.Screen name='RegisterTask' component={RegisterTask} />
                    <Stack.Screen name='CreateMission' component={CreateMission} />
            </Stack.Group>
        }
        </Stack.Navigator>
    )
}