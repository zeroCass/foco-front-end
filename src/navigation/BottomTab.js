import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              route.name === 'Tarefas' ? iconName = 'text-box-check-outline' : iconName = 'bullseye-arrow'
  
              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#008FD2',
            tabBarInactiveTintColor: 'gray',
          })}
        >
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