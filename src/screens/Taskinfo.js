import React, { useState, useEffect } from 'react'
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'
import CountDown from 'react-native-countdown-component' 

// component: touchable with view container thats close the modal
const touchableView = (props) => (
    <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.background}></View>
    </TouchableWithoutFeedback>
)

const countDownTimer = (until) => {
    console.log('Entrou coutndowntimer', until)
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
    />)
}

export default (props) => {
    console.log(props.isActive)
    const [active, setActive] = useState(false)
 
    const startTask = () => {
        props.start(props.id)
    }

    const stopTask = () => {
        props.stop(props.id)
        props.onClose()
    }

    const stringDateFormated = moment(props.estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(props.estimateTime).format('HH[:]mm')
    const until = props.isActive 
                    ? 86400
                    : 0
    // const timeLeft = props.estimateDate + props.estimateTime
    return (
        <Modal
            animationType='slide'
            visible={props.isVisible}
            transparent={true}
            onRequestClose={props.onClose}
        >   
            {touchableView(props)} 
            <View style={styles.centerView}>
                {touchableView(props)}
                <View style={{ flex: 8, backgroundColor: '#FFF'}}>
                    {active ? <Text>TRUE:{props.isActive}</Text> : null}
                    <Text>Nome:{props.name}</Text>
                    <Text>Descricao: {props.desc}</Text>
                    <Text>Prioridade: {props.priority}</Text>
                    <Text>Dificuldade: {props.difficulty}</Text>
                    <Text>Prazo: {stringDateFormated} - {stringTimeFormated}</Text>
                    {props.isActive ? countDownTimer(until): null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {!props.isActive ? 
                            <Button onPress={() => {
                                startTask()
                                setActive(true)
                            }}>
                                Iniciar
                            </Button>
                        : 
                        <Button onPress={stopTask}>
                            Finalizar
                        </Button>}
                    </View>
                </View>
                {touchableView(props)}
            </View>
            {touchableView(props)}
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
        flexDirection: 'row'
    }
})