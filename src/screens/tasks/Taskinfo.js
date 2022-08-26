import React, { useState, useContext } from 'react'
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'
import CountDown from 'react-native-countdown-component' 

import { TasksContext } from '../../context/Tasks'

// component: touchable with view container thats close the modal
import TouchableView from '../../components/TouchableView'

// countdown timer component that takes the time left to count 
const countDownTimer = (until) => {
    return (
        <CountDown
            until={until}
            size={20}
            showSeparator={true}
            timeLabels={false}
            timeLabelStyle={{ color: '#000' }}
            digitStyle={null}
            digitTxtStyle={{ color: '#FFF' }}
            separatorStyle={{ color: '#FFF' }}
            timeToShow={['H', 'M', 'S']}
            style={{ 
                backgroundColor: 'blue', 
                width: 200, height: 50, 
                borderRadius: 50, 
                justifyContent: 'center', alignItems: 'center' 
            }}
            onFinish={() => console.warn('Time ran out')}
        />
    )
}

// check which button (iniciar, finalizar ou finalizado) should be displayed
const renderButton = (props, dispatch) => {
    // active and not completed
    if (props.isActive && props.doneAt === null) {
        return (
            <Button onPress={() => {
                // task completed
                dispatch({
                    type: 'doneTask',
                    payload: { id: props.id }
                })
            }}>
                Finalizar
            </Button> 
        )
    }
    // not initialized and not expired
    if (!props.isActive && !props.expired) {
        return (
            <Button onPress={() => {
                // startTask in Tasks
                dispatch({
                    type: 'startTask',
                    payload: { id: props.id }
                })
            }}>
                Iniciar
            </Button>
        )
    }
    // has been completed
    if (props.doneAt !== null) {
        return (
            <Text> Finalizada em: {moment(props.doneAt).format('HH[:]mm D[/]MMM[/]YY')} </Text> 
       )
    }

    // expired
    return (
        <Text>Expirada em: {moment(props.estimateAt).format('HH[:]mm D[/]MMM[/]YY')}</Text>
    )
    

}

export default (props) => {

    const { dispatch } = useContext(TasksContext)
 
    const stringDateFormated = moment(props.estimateDate).format('HH[:]mm D[/]MMM[/]YY')

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
            <TouchableView {...props} /> 
            <View style={styles.centerView}>
                <TouchableView {...props} /> 
                <View style={styles.contentView}>
                    <Text>Nome:{props.name}</Text>
                    <Text>Descricao: {props.desc}</Text>
                    <Text>Prioridade: {props.priority}</Text>
                    <Text>Dificuldade: {props.difficulty}</Text>
                    <Text>Prazo: {stringDateFormated}</Text>
                    {props.isActive && !props.expired && props.doneAt == null ? countDownTimer(until): null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {renderButton(props, dispatch)}
                    </View>
                </View>
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
    }
})