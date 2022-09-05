import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

import { AuthContext } from '@context/Auth'

import { server, showError } from '../../common'
import axios from 'axios'

export default (props) => {
    const { user, dispatch } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true)
    const [confirmPass, setConfirmPass] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [godfather, setGodfather] = useState(null)
    const [newUser, setNewUser] = useState(false)
    const [age, setAge] = useState(null)
    
    useEffect(() => {
        setAge(getAge())
    }, [birthDate])


    const signupUser = async () => {
        let formattedBirthDate = birthDate.split('/')
        formattedBirthDate = `${formattedBirthDate[2]}-${formattedBirthDate[1]}-${formattedBirthDate[0]}`

        axios.post(`${server}/auth/signupUser`, {
            name,
            email,
            password,
            birthDate: formattedBirthDate,
        })
        .then(res => {
            axios.post(`${server}/auth/signupAutonomous`, {
                id: res.data.insertId
            })
            .then(setNewUser(false))
        })
    }

    const signin = async () => {
        axios.post(`${server}/auth/signin`, {
                email,
                password,
            })
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: 'signin',
                    payload: data
                })
            })
            .catch(e => showError(e))

    }


    const getAge = () => {  
        if (birthDate && birthDate.length === 10) {
            let today = new Date();
            let auxbirthDate = birthDate.split('/')
            auxbirthDate = new Date(birthDate[2], birthDate[1]-1, birthDate[0])
            let age = today.getFullYear() - auxbirthDate.getFullYear();
            let m = today.getMonth() - auxbirthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < auxbirthDate.getDate())) {
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
                    value={birthDate}
                    label='Data de Nascimento'
                    onChangeText={(birthDate) => { 
                        setBirthDate(birthDate)
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
                { age && age < 16 ? 
                Alert.alert(`Usuario menor de 16 anos`, `É necessário informar o ID do padrinho ou madrinha para continuar`,[
                            { text: 'OK' }], { cancelable: true }) : null }
                { age && age < 16 ?
                <TextInput
                    value={godfather}
                    label='ID do(a) Padrinho/Madrinha'
                    onChangeText={(id) => setGodfather(id)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='37'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='key-outline' />}
                />  : null}
                {!newUser 
                    ?  <Button onPress={() => signin()} >LOGIN</Button>
                    : <Button onPress={() => signupUser()} >REGISTRAR-SE</Button>}   
                {!newUser
                ?  <Button onPress={() => { 
                    setNewUser(!newUser) 
                    setAge(null) } } >REGISTRE-SE</Button>
                :  <Button onPress={() => {
                    setNewUser(!newUser) 
                    setAge(null)
                }} >JÁ POSSUO CONTA</Button>} 
                
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