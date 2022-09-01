import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Alert, Image } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import TouchableView from '../../components/TouchableView'

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
                    <View style={[styles.imgContainer, { justifyContent:'center', alignItems:'center' }]}>
                        <Image source={props.image} style={{ width: '100%', height:'100%' }} />
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txt}>{props.name}</Text>
                        <Text style={styles.txt}>{props.price}</Text>
                    </View>
                    <Button onPress={() => {
                        props.redeemItem(props.id)
                        Alert.alert('Item Resgato', `O item ${props.name} foi resgatado!`,[
                            { text: 'OK' }
                        ], { cancelable: true })
                        props.onClose()
                    }}>
                        Resgatar
                    </Button>
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
        padding: 20,
    },
    imgContainer: {
        height: '70%',
        width: '100%',
        borderRadius: 20,
        borderEndColor: '#000',
        borderWidth: 1,
    },
    txtContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    txt: {

    },
})