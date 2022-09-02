import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

import { AuthContext } from '@context/Auth'
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture'

export default (props) => {
    const { user, dispatch } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true)
    const [confirmPass, setConfirmPass] = useState('')
    const [birthday, setBirthday] = useState(null)
    const [godfather, setGodfather] = useState(null)
    const [newUser, setNewUser] = useState(false)
    const [age, setAge] = useState(null)
    
    useEffect(() => {
        setAge(getAge())
    }, [birthday])


    const getAge = () => {  
        if (birthday && birthday.length === 10) {
            let today = new Date();
            let birthDate = birthday.split('/')
            birthDate = new Date(birthDate[2], birthDate[1]-1, birthDate[0])
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.centerView} >
                <TextInput
                    value={email}
                    label='E-mail'
                    onChangeText={(email) => setEmail(email)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='email@mail.com'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='at' />}
                />
                { newUser && 
                <TextInput
                    value={name}
                    label='Nome Completo'
                    onChangeText={(name) => setName(name)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder=''
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='account-box' />}
                /> 
                }
                <TextInput
                    value={password}
                    label='Senha'
                    onChangeText={(password) => setPassword(password)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='*********'
                    activeOutlineColor='#6495ED'
                    secureTextEntry={hidePass}
                    right={<TextInput.Icon icon='eye' onPress={() => setHidePass(!hidePass)} />}
                    left={<TextInput.Icon icon='lock' />}
                />
                { newUser && 
                <TextInput
                    value={confirmPass}
                    label='Confirme a Senha'
                    onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='*********'
                    activeOutlineColor='#6495ED'
                    right={<TextInput.Icon icon='eye' onPress={() => setHidePass(!hidePass)} />}
                    left={<TextInput.Icon icon='lock' />}
                /> 
                }
                { newUser && 
                <TextInput
                    value={birthday}
                    label='Data de Nascimento'
                    onChangeText={(birthday) => { 
                        setBirthday(birthday)
                    }}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='dd/mm/aaaa'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='calendar' />}
                    render={props => 
                        <TextInputMask
                            {...props}
                            type={'custom'}
                            options={{
                                mask:'99/99/9999'
                            }}
                            // ref={(ref) => ageRef.current = ref}
                        />
                    }
                /> 
                }
                {age >= 16 ? <Text>Maior de IDADE</Text> : 
                age < 16 ? <Text>Menor de IDADE</Text> : null}
                {!newUser 
                    ?  <Button onPress={() =>  dispatch({
                        type: 'setAuth',
                        payload: null
                    })} >LOGIN</Button>
                    : <Button onPress={() =>  dispatch({
                        type: 'setAuth',
                        payload: null
                    })} >REGISTRAR-SE</Button>}   
                {!newUser
                ?  <Button onPress={() => setNewUser(!newUser) } >REGISTRE-SE</Button>
                :  <Button onPress={() => setNewUser(!newUser) } >JÁ POSSUO CONTA</Button>} 
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent:'center', 
        alignItems: 'center',
    },
    centerView: {
        flex: 1, 
        justifyContent:'center', 
        width: '80%',
    },
})