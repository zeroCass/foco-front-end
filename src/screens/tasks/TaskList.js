import React, { useState, useCallback, useContext, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,
    BackHandler,
} from 'react-native'
import { Button, IconButton } from 'react-native-paper'

import Task from '../../components/Task'

//contextos
import { TasksContext } from '../../context/Tasks'
import { AuthContext } from '../../context/Auth'


export default (props) => {
    const  { user } = useContext(AuthContext)
    const { state, dispatch } = useContext(TasksContext)

    // get only tasks that not belong a mission
    const tasks = state.tasks.filter(task => task.missionId === null ? true : false)

    // array of obj that contains all the seTimeout reference for each task
    let countdowns = []
    let countdowns2init = []
    // const intervalRef = useRef([]) useReft is useless cause i dont want to keep the value
    
    // for each tasks, setup a personal timeout
    const setupCountdowns = () => {
        countdowns = tasks.map(task => {
            // pegar tasks que o init time < date now
            if (task.initDate === null || (new Date().getTime() >= task.initDate.getTime())) {
                const until = task.estimateDate.getTime() - new Date().getTime()
                return setTimeout(() => dispatch({ type: 'expiredTask', payload: null }), until)
            } 
        })
    }

    const setupCountidowns2init = () => {
        countdowns2init = tasks.map(task => {
            if (task.initDate !== null) {
                const until = task.initDate.getTime() - new Date().getTime()
                return setTimeout(() => {
                    dispatch({ type: 'initCountdown', payload: null })
                    setupCountdowns() //call to setup the coutndown to expired
                }, until)
            }
        })
    }

    useEffect(() => {
        console.log('re-render')
        setupCountidowns2init()
        setupCountdowns()
        return () => {
            countdowns2init.forEach(elem => clearInterval(elem))
            countdowns.forEach(elem => clearInterval(elem))
        }
    }, [tasks])


    //prevent to goBack to loginScreen
    useFocusEffect(
        useCallback(() => {
        
          const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            BackHandler.exitApp()
            return true
          })
          return () => backHandler.remove()
        
        }, []))



    // const startTask = taskID => {
    //     let currentTasks = [...tasks]
    //     currentTasks.forEach(task => task.id === taskID ? task.isActive = true : task.isActive)
    //     setTasks(currentTasks)
    // }

    // const stopTask = taskID => {
    //     let currentTasks = [...tasks]
    //     currentTasks.forEach(task => task.id === taskID ? task.isActive = false : task.isActive)
    //     setTasks(currentTasks)
    // }

    return (
            <View style={styles.container}>
                <FlatList
                    data={tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} />}
                />
                <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        color='blue'
                        onPress={() => props.navigation.navigate('RegisterTask')}
                    />
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