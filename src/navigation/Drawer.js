import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button, Icon } from '@rneui/base'

// import AuthProvider from '../context/Auth'

import CustomDrawer from './CustomDrawer'

import TaskList from '../screens/TaskList'
import Perfil from '../screens/Perfil'
import Shop from '../screens/Shop'


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
                <Drawer.Screen name='Home' component={TaskList}
                    options={({ navigation }) => {
                        return { headerTitleAlign: 'center' }
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