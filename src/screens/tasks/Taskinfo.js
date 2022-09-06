import React, { useContext, useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'

//Contexts
import { AuthContext } from '@context/Auth'
import { TasksContext } from '../../context/Tasks'

//components
// component: touchable with view container thats close the modal
import TouchableView from '../../components/TouchableView'
import CountDownTimer from '../../components/CountDownTimer'
// check which button (iniciar, finalizar ou finalizado) should be displayed
import RenderButton from '@components/RenderButton'
// modal that is showns after complete a task
import CompletitionModal from '@components/CompletitionModal'



export default (props) => {
    const { dispatch: dispatchAuth } = useContext(AuthContext)
    const { dispatch } = useContext(TasksContext)
    // state to determiante if the completition modal is shown
    const [showCompletition, setShowCompletition] = useState(false)
    const stringDateFormated = moment(props.estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(props.estimateDate).format('HH[:]mm')

    // if the task is active, then calculate the time left until expired
    const until = 
        props.isActive ? (new Date (props.estimateDate).getTime() / 1000) - (new Date().getTime() / 1000) : 0

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
                {...props} type={'Task'}/>
            <TouchableView {...props} /> 
            <View style={styles.centerView}>
                <TouchableView {...props} /> 
                <View style={styles.contentView}>
                    <View style={styles.titileContainer}>
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }} >
                            {props.isActive && !props.expired && props.doneAt === null ? 
                                <CountDownTimer until={until} />: null}
                            {<RenderButton {...props} dispatch={dispatch} type={'Task'} 
                                onOpenCompletition={() => setShowCompletition(true)} />}
                        </View>
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
        height: '50%',
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
        backgroundColor: '#082E71'
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
    txt: {
        color: '#000',
        fontSize: 13,
        fontWeight: 'normal',
    },
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#1081B6',
    },
    dateView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
    }
})