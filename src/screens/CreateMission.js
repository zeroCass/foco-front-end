import React, { useContext } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'

import TouchableView from '../components/TouchableView'

export default props => {
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

                </View>
                <TouchableView {...props} />
            </View>
            <TouchableView {...props} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView: {
        height: '85%',
        flexDirection: 'row'
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
    }
})

