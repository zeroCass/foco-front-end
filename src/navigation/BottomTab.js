import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'

import TaskList from '../screens/tasks/TaskList'
import MissionList from '../screens/missions/MissionList'

const Tab = createBottomTabNavigator()

const Info = () => {
    return (
        <View>
            <Text>Info</Text>
        </View>
    )
}


export default (props) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Tarefas' component={TaskList} 
                options={{ headerShown: false }}
                listeners={({ route, navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('Home', { screen: 'Tarefas', params: { name: 'Tarefas' } })
                        }
                    }
                }}
            />
            <Tab.Screen name='Missões' component={MissionList} 
                options={{ headerShown: false }}
                listeners={({ route, navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('Home', { screen: 'Missões', params: { name: 'Missões' } })
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}