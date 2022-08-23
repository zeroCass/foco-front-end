import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import Taskinfo from '../screens/Taskinfo'

export default (props) => {
    
    const [showTaskInfo, setTaskInfo] = useState(false)

    const stringDateFormated = moment(props.estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(props.estimateTime).format('HH[:]mm')

    return (
        <>
            <Taskinfo isVisible={showTaskInfo} onClose={() => setTaskInfo(false)} {...props}/>
            <TouchableOpacity onPress={() => setTaskInfo(true)}>
                <View style={styles.container}>
                    <Text style={styles.titile}>{props.name}</Text>
                        <View style={styles.taskContainer}>
                            <View style={styles.textContainer}>
                                <Text>Prioridade: {props.priority}</Text>
                                <Text>Prazo: {stringTimeFormated} - {stringDateFormated}</Text>
                            </View>
                            <View style={styles.checkContainer}>
                                <View style={styles.buttonCheck}></View>
                            </View>
                        </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text>{props.isActive ? 'Em Andamento': 'Não Iniciado'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    taskContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
    },
    textContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titile: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {

    },
    buttonCheck: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
})