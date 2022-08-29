import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import MissionInfo from '../screens/missions/MissionInfo'

export default props => {
    const [showMissionInfo, setMissionInfo] = useState(false)
    const stringDateFormated = moment(props.estimateDate).format('HH[:]mm D[/]MMM[/]YY')

    return (
        <>
            <MissionInfo  isVisible={showMissionInfo} onClose={() => setMissionInfo(false)} {...props} />
            <TouchableOpacity onPress={() => setMissionInfo(true)} >
            <View style={styles.container}>
                    <Text style={styles.titile}>{props.name}</Text>
                    <View style={styles.taskContainer}>
                        <View style={styles.textContainer}>
                            <Text>Prioridade: {props.priority}</Text>
                            <Text>Prazo: {stringDateFormated}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {props.tasks.map(task => {
                        return (
                            <Text>.{task.name}</Text>
                        )
                    })}
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text>{props.isActive && !props.expired && props.doneAt === null ? 'Em Andamento':
                                !props.isActive && !props.expired && props.doneAt === null ? 'Não Iniciado' : 
                                props.expired ? 'Expirado' :
                                props.doneAt !== null ? 'Finalizada' : null}
                        </Text>
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