import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button, Icon } from '@rneui/base'

// import AuthProvider from '../context/Auth'

import CustomDrawer from './CustomDrawer'

import BottomTab from './BottomTab'

import TaskList from '../screens/tasks/TaskList'
import Perfil from '../screens/Perfil'
import Shop from '../screens/shop/Shop'


const Drawer = createDrawerNavigator()
  
const homeButton = (navigation) => (
    <Button
        onPress={() => navigation.navigate('Home')}
        type='clear'
        icon={<Icon name='home' size={25} color='#000'/>}
    />
)


export default () => {
    return (
            <Drawer.Navigator
                useLegacyImplementation 
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name='Home' component={BottomTab}
                    options={({ route }) => {
                        return { headerTitleAlign: 'center', title: route.params ? route.params.params.name: 'Tarefas' }
                        }}
                />
                <Drawer.Screen name='Perfil'component={Perfil}
                    options={({ navigation }) => {
                        return {
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                homeButton(navigation)
                            )
                        }
                    }}
                />
                <Drawer.Screen name='Shop'component={Shop}
                    options={({ navigation }) => {
                        return {
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                homeButton(navigation)
                            )
                        }
                    }}
                />
            </Drawer.Navigator>
    )
}