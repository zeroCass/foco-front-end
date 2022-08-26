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
            <Tab.Screen name='TaskList' component={TaskList} options={{ headerShown: false }}/>
            <Tab.Screen name='MissionList' component={MissionList} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}