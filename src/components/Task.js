import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import Taskinfo from '../screens/tasks/Taskinfo'

export default (props) => {
    
    const [showTaskInfo, setTaskInfo] = useState(false)

    const stringDateFormated = moment(props.estimateDate).format('HH[:]mm D[/]MMM[/]YY')
    const status = props.isActive && !props.expired && props.doneAt === null ? 'Em Andamento':
                    !props.isActive && !props.expired && props.doneAt === null ? 'Não Iniciado' : 
                    props.expired ? 'Expirado' :
                    props.doneAt !== null ? 'Finalizada' : null
    
    let statusColor
    let iconName
    switch (status) {
        case 'Em Andamento':
            statusColor = '#082E71'
            iconName = 'timer'
            break
        case 'Não Iniciado':
            statusColor = '#AAA'
            iconName = 'play-circle'
            break
        case 'Expirado':
            statusColor = '#A73325'
            iconName = 'close-circle'
            break
        case 'Finalizada':
            statusColor = '#16CBC8'
            iconName = 'check-circle'
            break
        default:
            break
    }


    return (
        <>
            <Taskinfo isVisible={showTaskInfo} onClose={() => setTaskInfo(false)} {...props}/>
            <TouchableOpacity onPress={() => setTaskInfo(true)}>
                <View style={styles.container}>
                    <View style={[styles.titleContainer, { backgroundColor: statusColor }]} >
                        <Text style={styles.title}>{props.name}</Text>
                    </View>
                        <View style={styles.taskContainer}>
                            <View style={styles.textContainer}>
                                <Text>Prioridade: 
                                    {props.priority == 0 ? 'Baixa' : props.priority == 1 ? 'Media' : 'Alta'}
                                </Text>
                                <Text>Prazo: {stringDateFormated}</Text>
                            </View>
                            <View style={styles.checkContainer}>
                                {/* <View style={styles.buttonCheck}></View> */}
                                <Icon name={iconName} size={60} color={statusColor} />
                            </View>
                        </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: statusColor }} >{status}</Text>
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
        backgroundColor: '#FFF',
    },
    titleContainer: {
        alignItems: 'center', 
        width:'100%',
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
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