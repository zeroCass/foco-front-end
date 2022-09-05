import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-paper'
import { Bar } from 'react-native-progress'

import { AuthContext } from '@context/Auth'

export default props => {
    const { user } = useContext(AuthContext)
    const lvl = Math.floor(user.xp / 1000)
    const xpLeft = user.xp - lvl * 1000
    const progress = xpLeft / 1000

    return (
        <View style={styles.container}>
            <View style={styles.perfilContainer}>
                <View style={styles.pointsContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        {user.points === 0 || user.points > 0 ? 
                        <>
                            <Icon name='star' size={40} color='#000' />
                            <Text style={styles.txtPoints} >{user.points}</Text>
                        </> : null}
                    </View>
                </View>
                <View style={styles.pefil}>
                    <View style={styles.avatar}>
                        <Avatar.Icon icon='account' size={120} />
                    </View>
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.txtName}>{user.name}</Text>
                            <Text style={styles.txtInfo}>{user.email}</Text>
                            <Text style={styles.txtInfo}>ID: {user.id}</Text>
                        </View>
                    </View>
                </View>
                {user.xp === 0 || user.xp > 0 ? 
                <View style={styles.levelContainer}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} >Nível {lvl}</Text>
                    </View>   
                    <View>
                        <Bar progress={progress} width={300} height={25} color='#6401ee' />
                    </View>
                </View>
                : null}
            </View>
            <View style={styles.addonContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    perfilContainer: {
        flex: 1,
    },
    addonContainer: {
        flex: 1,
    },
    pointsContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 20,   
    },
    txtPoints: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pefil: {
        flexDirection: 'row',
        flex: 3,
    },
    avatar: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    info: {
        width: '60%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    txtName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    txtInfo: {
        fontSize: 15,
    },
    levelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,   
    },
})