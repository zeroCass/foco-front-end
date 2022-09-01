import React, { useContext, useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

import { TasksContext } from '../../context/Tasks'

// component: touchable with view container thats close the modal
import TouchableView from '../../components/TouchableView'

// countdown timer component that takes the time left to count 
import CountDownTimer from '../../components/CountDownTimer'

// check which button (iniciar, finalizar ou finalizado) should be displayed
import RenderButton from '@components/RenderButton'

// modal that is showns after complete a task
import CompletitionModal from '@components/CompletitionModal'

export default (props) => {

    const { dispatch } = useContext(TasksContext)
    // state to determiante if the completition modal is shown
    const [showCompletition, setShowCompletition] = useState(false)
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
            <CompletitionModal isVisible={showCompletition} onClose={() => setShowCompletition(false)} {...props} />
            <TouchableView {...props} /> 
            <View style={styles.centerView}>
                <TouchableView {...props} /> 
                <View style={styles.contentView}>
                    <Text>Nome:{props.name}</Text>
                    <Text>Descricao: {props.desc}</Text>
                    <Text>Prioridade: {props.priority}</Text>
                    <Text>Dificuldade: {props.difficulty}</Text>
                    <Text>Prazo: {stringDateFormated}</Text>
                    {props.isActive && !props.expired && props.doneAt === null ? <CountDownTimer until={until} />: null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {<RenderButton {...props} dispatch={dispatch} type={'Task'} 
                            onOpenCompletition={() => setShowCompletition(true)} />}
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