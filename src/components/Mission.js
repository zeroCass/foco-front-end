import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import MissionInfo from '../screens/missions/MissionInfo'

import DotTask from '@components/DotTask'

// const DotItem = (task) => {
//     let iconName = task.doneAt ? 'check-circle' : 'dots-horizontal-circle-outline'
//     let iconColor = task.doneAt ? '#9d53f3' : '#AAA'
//     // #9d53f3 (roxo)
//     // #16CBC8 (auzl)
//     return (
//         <View style={{ flexDirection: 'row', margin: 10 }} >
//             <Icon name={iconName} size={30} color={iconColor} />
//             <Text>{task.name}</Text>
//         </View>
//     )
// }

export default props => {
    const [showMissionInfo, setMissionInfo] = useState(false)
    const stringDateFormated = moment(props.estimateDate).format('HH[:]mm D[/]MMM[/]YY')

    const status = props.isActive && !props.expired && props.doneAt === null ? 'Em Andamento':
                !props.isActive && !props.expired && props.doneAt === null ? 'Não Iniciado' : 
                props.expired ? 'Expirado' :
                props.doneAt !== null ? 'Finalizada' : null
    
    let statusColor
    switch (status) {
        case 'Em Andamento':
            statusColor = '#45068f'
            break
        case 'Não Iniciado':
            statusColor = '#AAA'
            break
        case 'Expirado':
            statusColor = '#A73325'
            break
        case 'Finalizada':
            statusColor = '#9d53f3'
            break
        default:
            break
    }

    return (
        <>
            <MissionInfo  isVisible={showMissionInfo} onClose={() => setMissionInfo(false)} {...props} />
            <TouchableOpacity onPress={() => setMissionInfo(true)} >
            <View style={styles.container}>
                <View style={[styles.titleContainer, { backgroundColor: statusColor }]} >
                    <Text style={styles.title}>{props.name}</Text>
                </View>
                    <View style={styles.missionContainer}>
                        <View style={styles.textContainer}>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text>Prioridade:
                                    {props.priority == 0 ? 'Baixa' : props.priority == 1 ? 'Media' : 'Alta'}
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text>Prazo: {stringDateFormated}</Text>
                            </View>      
                        </View>
                        <View style={styles.textContainer}>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text>Dificuldade:
                                    {props.difficulty == 0 ? 'Baixa' : props.difficulty == 1 ? 'Media' : 'Alta'}
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text>Categoria:
                                    {props.category}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.taskList}>
                        {props.tasks.map(task => <DotTask key={task.id} {...task} />)}
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
    missionContainer: {
        padding: 10,
        backgroundColor: 'white',
    },
    taskList: {

    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        flexDirection: 'row',
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