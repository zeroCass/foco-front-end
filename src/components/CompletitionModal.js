import React, { useState, useEffect, useContext } from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import { Button } from 'react-native-paper'

import TouchableView from '@components/TouchableView'
import { TasksContext } from '@context/Tasks'


const renderSlider = (progress, callback, setProgress) => {
    return (
        <View style={styles.sliderContainer}>
        <Text>Tarefa Concluída!</Text>
        <Slider
            value={progress}
            onValueChange={(value) => setProgress(value)}
            containerStyle={styles.slider}
            trackStyle={{ backgroundColor:'#AAA'}}
            thumbStyle={{ backgroundColor:'#13a9d6' }}
            minimumTrackTintColor="#13a9d6"
        />
        <Text>{Math.floor(progress * 100)}%</Text>
        <Button onPress={callback} >Feito</Button>
    </View>
    )
}

const renderPoints = (props, progress) => {
    //calculate time bonus
    let timeBonus = 50
    let time2Complete = (new Date(props.estimateDate).getTime() - new Date(props.startAt).getTime()) / 1000
    let timeTaked = (new Date(props.doneAt).getTime() - new Date(props.startAt).getTime()) / 1000
    let porcentageTime = timeTaked / time2Complete
    timeBonus -= timeBonus * porcentageTime

    //calculate the points
    let points = props.type === 'Mission' ? 100 : 50
    let xp = props.type === 'Mission' ? 200 : 100
    let difficulty = props.difficulty + 1
    let priority = props.priority + 1

    points += ((difficulty * 0.1) * points) + ((priority * 0.1) * points)
    xp += ((difficulty * 0.1) * xp) + ((priority * 0.1) * xp)

    if (props.type === 'Mission') {
        let tasks = props.tasks
        let tasksCompleted = tasks.reduce((sum, task) => task.doneAt ? sum+=1 : sum, 0)
        progress = tasksCompleted / tasks.length
    }
    xp += Math.floor(timeBonus)
    points += Math.floor(timeBonus)

    xp = Math.floor(xp  * progress)
    points = Math.floor(points * progress)

    return (
        <View>
            <Text>Ponto Recebidos: {points}</Text>
            <Button onPress={() => props.onCloseCompletition({ xp, points })} >OK</Button>
        </View>
    )
}

export default props => {

    const [progress, setProgress] = useState(0)
    const [showPoints, setShowPonints] = useState(false)
    const { state: { tasks } } = useContext(TasksContext)

    useEffect(() => {
        // if showpints (render the points modal)
        // if not showpoints and type is Task, then render the slider
        // if not shpwpoints and type is Mission, check if the modal is visible or not
            // if is visile, then show the points modal
        showPoints  
            ? renderPoints({...props}, progress) 
            : props.type === 'Task' ? renderSlider(progress, completed, setProgress)
            : completed()
    }, [tasks])
    
    const completed = () => {
        if (props.completitionVisible)
            setShowPonints(true)      
    }
    

    return (
        <Modal
            animationType='fade'
            visible={props.completitionVisible}
            transparent={true}
            onRequestClose={() => null}
        >
            <TouchableView {...props} style={{ flex: 3 }} onClose={() => null} />
                <View style={styles.centerView}>
                    <TouchableView {...props} onClose={() => null}/>
                    <View style={styles.contentView}>
                        <View style={styles.container}>
                            {showPoints  
                                ? renderPoints({...props}, progress) 
                                : props.type === 'Task' ? renderSlider(progress, completed, setProgress)
                                : completed()}
                            {/* {props.type === 'Task'
                                ? renderSlider(progress, completed, setProgress)
                                : completed()} */}
                        </View>
                    </View>
                    <TouchableView {...props} onClose={() => null}/>
                </View>
            <TouchableView {...props} style={{ flex: 3 }} onClose={() => null}/>
        </Modal>    
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    centerView: {
        flex: 4,
        flexDirection: 'row',
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        // padding: 20,
        margin: 20,
        alignItems: 'center',
        width: '100%',
    },
    slider: {
        width: '50%',
    },  

})