import React, { useContext, useState } from 'react'
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'

import { AuthContext } from '@context/Auth'
import { MissionsContext } from '../../context/Missions'

// components
import TouchableView from '../../components/TouchableView'
import CountDownTimer from '../../components/CountDownTimer'
import CompletitionModal from '@components/CompletitionModal'
import TaskSelectList from '@components/TaskSelectList'
// check which button (iniciar, finalizar ou finalizado) should be displayed
import RenderButton from '../../components/RenderButton'




export default props => {
    const { dispatch: dispatchAuth } = useContext(AuthContext)
    const { dispatch } = useContext(MissionsContext)
    const [showCompletition, setShowCompletition] = useState(false)
    const stringDateFormated = moment(props.estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(props.estimateDate).format('HH[:]mm')
    // if the task is active, then calculate the time left until expired
    const until = 
        props.isActive ? (props.estimateDate.getTime() / 1000) - (new Date().getTime() / 1000) : 0

    return (
        <Modal
            animationType='slide'
            visible={props.isVisible}
            transparent={true}
            onRequestClose={props.onClose}
        >
            <CompletitionModal 
                completitionVisible={showCompletition} 
                onCloseCompletition={(userSettings) => {
                    setShowCompletition(false)
                    if (userSettings) {
                        dispatchAuth({
                            type: 'setXP',
                            payload: null
                        })
                    }   
                }} 
                {...props} type={'Mission'} />
            <TouchableView {...props} /> 
                <View style={styles.centerView}>
                    <TouchableView {...props} />
                    <ScrollView>
                        <View style={styles.contentView}>
                            <View style={styles.titileContainer} >
                                <Text style={styles.title}>{props.name}</Text>
                            </View>
                            <View style={styles.container} >
                                <View style={styles.infoContainer} >
                                    <Text style={styles.infoTxt}>
                                        Descricao: 
                                        <Text style={styles.txt}>{props.desc}</Text>
                                    </Text>
                                    <Text  style={styles.infoTxt}>
                                        Prioridade: 
                                        <Text style={styles.txt}>
                                            {props.priority == 0 ? 'Baixa'
                                                :props.priority == 1 ? 'Mediana':'Alta'}
                                        </Text>
                                    </Text>
                                    <Text style={styles.infoTxt} >
                                        Dificuldade: 
                                        <Text style={styles.txt}>
                                            {props.difficulty == 0 ? 'Baixa'
                                                :props.difficulty == 1 ? 'Média' : 'Alta'}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ padding: 20 }} >
                                    <View style={{ alignItems: 'center' }} >
                                        <Text style={{ fontWeight:'bold' }} >Tarefas:</Text>
                                    </View>
                                    {props.tasks.map(task => {
                                        const mission = props
                                        return <TaskSelectList key={task.id} {...task} mission={mission} />
                                    })}
                                </View>
                                <View style={{ alignItems: 'center' }} >
                                    <Text>Prazo Final</Text>
                                    <View style={styles.dateView}>
                                        <Button mode='contained' icon='clock-time-nine' style={styles.dateButton}>
                                            {stringTimeFormated}
                                        </Button>
                                        <Button mode='contained' icon='calendar-range' style={styles.dateButton}>
                                            {stringDateFormated}
                                        </Button>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                                    {props.isActive && !props.expired && props.doneAt === null ? 
                                        <CountDownTimer until={until} />: null}
                                    {<RenderButton {...props} dispatch={dispatch} type={'Mission'} 
                                    onOpenCompletition={() => setShowCompletition(true)}  />}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableView {...props} />
                </View>
            <TouchableView {...props} />
        </Modal>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    centerView: {
        height: '70%',
        flexDirection: 'row',
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
    },
    titileContainer:{
        width: '100%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#45068f'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
    },
    infoContainer: {
        padding: 20,
    },
    infoTxt: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 13,
    },
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#8e47e1',
    },
    dateView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        padding: 20,
    }
})