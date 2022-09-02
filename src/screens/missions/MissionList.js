import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { IconButton } from 'react-native-paper'
import Mission from '../../components/Mission'

import { MissionsContext } from '../../context/Missions'

export default props => {
    const { state: {missions}, dispatch } = useContext(MissionsContext)

    // the mission obj is recieve by params
    // everytime the params changed, rerender the component
    // useEffect(() => {
    //     if (props.route.params) {
    //         const mission = JSON.parse(props.route.params)
    //         setMissions((prevMissions) => [...prevMissions, mission])
    //     }
    // }, [props.route.params])

    useEffect(() => {
        setupCountidowns2init()
        setupCountdowns()
        return () => { 
            countdowns2init.forEach(elem => clearInterval(elem))
            countdowns.forEach(elem => clearInterval(elem.timeout))
        }
    }, [missions])


    let countdowns = []
    let countdowns2init = []

    // for each missions, setup a personal timeout
    const setupCountdowns = () => {
        // cria array aux
        const auxCountdowns = [...countdowns]

        // para cada task, realizar filtro para verificar se ja existe um CT para ela
        // Se o resultado for UNDEFINED (n tem), 
        //entao adiioncar um obj contendo CT e o ID da task no array de COUTNDOWN
        missions.forEach(mission => {
            const found = countdowns.find(ct => ct.id === mission.id)
            if (!found) {
                // pegar missions que o init time < date now
                if ((!mission.expired && mission.doneAt === null) && 
                    (mission.initDate === null || (new Date().getTime() >= mission.initDate.getTime()))) {
                    const until = mission.estimateDate.getTime() - new Date().getTime()
                    auxCountdowns.push({
                        timeout: setTimeout(() => dispatch({ type: 'expiredMission', payload: {id: mission.id }}), until),
                        id: mission.id,
                    })
                } 
            }
        })
        countdowns = auxCountdowns
        // if (newCountdown.length != countdowns.length)
        //     setCountdowns(newCountdown)
        
    }

    const setupCountidowns2init = () => {
        const auxCountdowns2init = missions.map(mission => {
            if ((!mission.expired && mission.doneAt === null) && 
                (mission.initDate !== null && mission.initDate.getTime() > new Date().getTime())) {
                const until = mission.initDate.getTime() - new Date().getTime()
                return setTimeout(() => {
                    dispatch({ type: 'initCountdown', payload: { id: mission.id } })
                    setupCountdowns() //call to setup the coutndown to expired
                }, until)
            }
        })
        countdowns2init = auxCountdowns2init
        // if (auxCountdowns2init.length != countdowns2init.length)
        //     setCountdowns2init(auxCountdowns2init)
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={missions}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Mission {...item} />}
            />
            <View style={styles.addButton}>
                <IconButton
                    icon='plus-circle'
                    size={50}
                    color='#8122f0'
                    onPress={() => props.navigation.navigate('CreateMission')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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