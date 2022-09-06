import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { AuthContext } from '@context/Auth'

import ShopItem from '../../components/ShopItem'
import CreateShopItem from './CreateShopItem'

import axios from 'axios'
import { server } from '../../common'

export default props => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [shopItems, setShopItems] = useState([])
    const { user, updateStatus } = useContext(AuthContext)

    useEffect(() => {
        const fetchInitialData = async () => {
            getItems()
        }
        fetchInitialData()
    }, [])

    const getItems = () => {
        axios.get(`${server}/shop/${user.id}`)
        .then((res) => setShopItems(res.data))
        
    }

    const addShopItem = (item) => {
        axios.post(`${server}/shop`, {
            ...item
        })
        .then(() => getItems())
        .catch(e => console.log(e))
        
    }

    const redeemItem = (itemId) => {
        // check if the user has enough points to purchase
        const item = shopItems.find(i => i.id === itemId)
        if (item && user.points >= item.price) {
            axios.put(`${server}/shop/${itemId}`)
            .then(() => getItems())
            .then(() => updateStatus([{points: -item.price}]))
            .catch(e => console.log(e))
        }


        
    }

    return (
        <>
            <CreateShopItem 
                isVisible={showCreateModal} 
                onClose={() => setShowCreateModal(false)}
                saveItem={addShopItem} 
            />
            <View style={{ flex: 1 }} >
                <ScrollView contentContainerStyle={styles.container} >
                    {shopItems ?
                    shopItems.map(item => {
                        return <ShopItem key={item.id} {...item} redeemItem={redeemItem} />
                    }): null}
                </ScrollView>
                {!user.mainGodparent ? 
                <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        color='blue'
                        onPress={() => setShowCreateModal(true)}
                    />
                </View>
                :null}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})