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
    // const [countdowns, setCountdowns] = useState([])
    // const [countdowns2init, setCountdowns2init] = useState([])

    // get only tasks that not belong a mission
    const tasks = state.tasks.filter(task => task.missionId === null ? true : false)

    // array of obj that contains all the seTimeout reference for each task
    let countdowns = []
    let countdowns2init = []
    // const intervalRef = useRef([]) useReft is useless cause i dont want to keep the value
    
    // for each tasks, setup a personal timeout
    const setupCountdowns = () => {
        // cria array aux
        const auxCountdowns = [...countdowns]

        // para cada task, realizar filtro para verificar se ja existe um CT para ela
        // Se o resultado for UNDEFINED (n tem), 
        //entao adiioncar um obj contendo CT e o ID da task no array de COUTNDOWN
        tasks.forEach(task => {
            const found = countdowns.find(ct => ct.id === task.id)
            if (!found) {
                // pegar tasks que o init time < date now
                if ((!task.expired && task.doneAt === null) && 
                    (task.initDate === null || (new Date().getTime() >= task.initDate.getTime()))) {
                    const until = task.estimateDate.getTime() - new Date().getTime()
                    auxCountdowns.push({
                        timeout: setTimeout(() => dispatch({ type: 'expiredTask', payload: {id: task.id }}), until),
                        id: task.id,
                    })
                } 
            }
        })
        countdowns = auxCountdowns
        // if (newCountdown.length != countdowns.length)
        //     setCountdowns(newCountdown)
        
    }

    const setupCountidowns2init = () => {
        const auxCountdowns2init = tasks.map(task => {
            if ((!task.expired && task.doneAt === null) && 
                (task.initDate !== null && task.initDate.getTime() > new Date().getTime())) {
                const until = task.initDate.getTime() - new Date().getTime()
                return setTimeout(() => {
                    dispatch({ type: 'initCountdown', payload: { id: task.id } })
                    setupCountdowns() //call to setup the coutndown to expired
                }, until)
            }
        })
        countdowns2init = auxCountdowns2init
        // if (auxCountdowns2init.length != countdowns2init.length)
        //     setCountdowns2init(auxCountdowns2init)
    }

    useEffect(() => {
        setupCountidowns2init()
        setupCountdowns()
        return () => { 
            countdowns2init.forEach(elem => clearInterval(elem))
            countdowns.forEach(elem => clearInterval(elem.timeout))
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
                        onPress={() => props.navigation.navigate('CreateTask')}
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