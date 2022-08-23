import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,
    BackHandler,
} from 'react-native'
import { Button, IconButton } from 'react-native-paper'

import Task from '../components/Task'
import Taskinfo from './Taskinfo'
import CreateTask from './CreateTask'

//contextos
import { TarefaContext } from '../context/Tarefa'
import { AuthContext } from '../context/Auth'


export default (props) => {
    const  { user } = useContext(AuthContext)
    const { tarefas } = useContext(TarefaContext)

    //prevent to goBack to loginScreen
    useFocusEffect(
        useCallback(() => {
        
          const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            BackHandler.exitApp()
            return true
          })
          return () => backHandler.remove()
        
        }, []))

    const [showCreateTask, setShowCreateTask] = useState(false)
    const [tasks, setTasks] = useState([])


    const addTask = task => {
        task.id = Math.random()
        console.log('TaskList, task: ', task)
        setTasks([...tasks, task])
    }

    const startTask = taskID => {
        let currentTasks = [...tasks]
        currentTasks.forEach(task => task.id === taskID ? task.isActive = true : task.isActive)
        setTasks(currentTasks)
    }

    const stopTask = taskID => {
        let currentTasks = [...tasks]
        currentTasks.forEach(task => task.id === taskID ? task.isActive = false : task.isActive)
        setTasks(currentTasks)
    }

    return (
            <View style={styles.container}>
                <CreateTask isVisible={showCreateTask} onClose={() => setShowCreateTask(false)} onAddTask={addTask} />
                <FlatList
                    data={tarefas}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} start={startTask} stop={stopTask}/>}
                />
                {/* <FlatList
                    data={tarefas}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Text>{item.id}-{item.name}</Text>}
                /> */}
                <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        color='blue'
                        onPress={() => setShowCreateTask(true)}
                    />
                </View>
                <View>
                    <Button onPress={() => props.navigation.navigate('RegisterTask')}>
                        Register
                    </Button>
                </View>
            </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})