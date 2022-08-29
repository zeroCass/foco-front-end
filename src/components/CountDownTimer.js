import React from 'react'
import CountDown from 'react-native-countdown-component' 

export default ({ until }) => {
    return (
        <CountDown
            until={until}
            size={20}
            showSeparator={true}
            timeLabels={false}
            timeLabelStyle={{ color: '#000' }}
            digitStyle={null}
            digitTxtStyle={{ color: '#FFF' }}
            separatorStyle={{ color: '#FFF' }}
            timeToShow={['H', 'M', 'S']}
            style={{ 
                backgroundColor: 'blue', 
                width: 200, height: 50, 
                borderRadius: 50, 
                justifyContent: 'center', alignItems: 'center' 
            }}
            onFinish={() => console.warn('Time ran out')}
        />
    )
}