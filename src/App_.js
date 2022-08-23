import React, { createContext, useState, useReducer, useContext } from 'react'
import { View, FlatList, Text, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

const TaskContext = createContext({})

const initialState = [{ name: `Task name ${Math.floor(Math.random() * 100)}`, id: Math.floor(Math.random() * 100) }]

const TaskProvider = ({ children })  => {

    const reducer = (state, action) => {
        console.log('entrou reducer')
        switch(action.type) {
            case 'addTask':
                console.log([...state, action.payload])
                return [...state, action.payload]
            default:
                return state
        }
    }

    const [tasks, dispatch] = useReducer(reducer, initialState)

    return (            
        <TaskContext.Provider value={ { tasks, dispatch } }>
            {children}
        </TaskContext.Provider>
    )
}





const HomePage = ({ navigation }) => {

    const { tasks, dispatch } = useContext(TaskContext)
    return (
        <View>
            <Text>Home</Text>
            <FlatList
                data={tasks}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Text>{item.id} - {item.name}</Text>}
            />
            <Button
                title='Add Task'
                onPress={() => navigation.navigate('AddTask')}
            />
        </View>
    )
}



const Info = () => {
    return (
        <View>
            <Text>Info</Text>
        </View>
    )
}

const AddTaskPage = () => {
    const { dispatch } = useContext(TaskContext)
    const newTask = {id: Math.floor(Math.random() * 100), name: `Task name ${Math.floor(Math.random() * 100)}`}
    return (
         <View>
            <Text>addTaskPage</Text>
            <Button
                title='AddTask'
                onPress={() => dispatch({
                    type: 'addTask',
                    payload: newTask
                })}
            />
        </View>
    )
}



const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()  

const DrawerNavigation = () =>{
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomePage}/>
            <Drawer.Screen name='Info' component={Info}/>
        </Drawer.Navigator>
    )
}


export default App = () => {
    return (
        <TaskProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Menu'>
                    <Stack.Screen name='Menu' options={{ headerShown: false }} component={DrawerNavigation} />
                    <Stack.Screen name='AddTask' component={AddTaskPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </TaskProvider>
    )
            
}