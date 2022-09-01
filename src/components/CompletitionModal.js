import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import { Buton, Button } from 'react-native-paper'

import TouchableView from '@components/TouchableView'

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

const renderPoints = (onClose) => {
    return (
        <View>
            <Text>Ponto Recebidos</Text>
            <Button onPress={onClose} >OK</Button>
        </View>
    )
}


export default props => {
    const [progress, setProgress] = useState(0)
    const [showPoints, setShowPonints] = useState(false)

    return (
        <Modal
            animationType='fade'
            visible={props.isVisible}
            transparent={true}
            onRequestClose={props.onClose}
        >
            <TouchableView {...props} style={{ flex: 3 }} />
                <View style={styles.centerView}>
                    <TouchableView {...props}/>
                    <View style={styles.contentView}>
                        <View style={styles.container}>
                            {showPoints  
                                ? renderPoints(props.onClose) 
                                : renderSlider(progress, () => setShowPonints(true), setProgress)}
                        </View>
                    </View>
                    <TouchableView {...props} />
                </View>
            <TouchableView {...props} style={{ flex: 3 }}/>
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