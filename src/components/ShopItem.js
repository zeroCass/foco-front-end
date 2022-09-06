import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import RedeemItem from '@screens/shop/RedeemItem'
import imgSource from '../../src/assets/images/cart_market.png'

export default props => {
    const [showRedeemModal, setShowRedeemModal] = useState(false)
    const image = props.image ? props.image : imgSource

    return (
        <TouchableOpacity onPress={() => setShowRedeemModal(true)} >
            <RedeemItem  isVisible={showRedeemModal} onClose={() => setShowRedeemModal(false)} {...props} />
            <View style={styles.container}>
                <View style={[styles.imgContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Image source={image} style={styles.imgContainer} />
                </View>
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>{props.name}</Text>
                    <Text style={styles.txt}>{props.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height / 3.5,
        width: Dimensions.get('window').width / 3.5,
        borderWidth: 2,
        borderColor: '#000',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: (Dimensions.get('window').height / 3.5) * 0.10,
    },
    imgContainer: {
        // flex: 3,
        height: '70%',
        width: '100%',
        borderTopStartRadius: (Dimensions.get('window').height / 3.5) * 0.10,
        borderTopEndRadius: (Dimensions.get('window').height / 3.5) * 0.10,
    },
    txtContainer: {
        // flex: 1,
        paddingTop: 2,
        height: '30%',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#AAA',
        borderBottomStartRadius: (Dimensions.get('window').height / 3.5) * 0.10,
        borderBottomEndRadius: (Dimensions.get('window').height / 3.5) * 0.10,
    },
    txt: {
        fontWeight: 'bold',
    },
})