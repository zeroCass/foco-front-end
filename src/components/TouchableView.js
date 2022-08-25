import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

export default (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={[styles.background, props.style ? props.style : {}]}></View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})