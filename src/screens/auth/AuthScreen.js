import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

import { AuthContext } from '@context/Auth'

export default (props) => {
    const { 
        signin: usersignin, 
        signup: usersignup,
        getGodparentId,
    } = useContext(AuthContext)
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true)
    const [hidePassConfirm, setHidePassConfirm] = useState(true)
    const [confirmPass, setConfirmPass] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [godparentId, setGodparentId] = useState(null)
    const [godparent, setGodparent] = useState(false)
    const [godparentType, setGodparentType] = useState('')
    const [newUser, setNewUser] = useState(false)
    const [age, setAge] = useState(null)
    
    useEffect(() => {
        setAge(getAge())
    }, [birthDate])


    const getFormattedBirthDate = () => {
        let formattedBirthDate = birthDate.split('/')
        return `${formattedBirthDate[2]}-${formattedBirthDate[1]}-${formattedBirthDate[0]}`
    }

    const getAge = () => { 
        if (birthDate && birthDate.length === 10) {
            let today = new Date();
            let auxbirthDate = birthDate.split('/')
            auxbirthDate = new Date(auxbirthDate[2], auxbirthDate[1]-1, auxbirthDate[0])
            let age = today.getFullYear() - auxbirthDate.getFullYear();
            let m = today.getMonth() - auxbirthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < auxbirthDate.getDate())) {
                age--;
            }
            return age;
        }
    }

    const signup = () => {
        // if is dependet user
        if (godparentId) {
            // check if the godparentId is valid
            getGodparentId(godparentId)
            .then((data) => {
                if (data.length === 0) throw 'Parent com id nao encontrado'
                const [ parent ] = data.data
                usersignup({
                    name,
                    email,
                    password,
                    birthDate : getFormattedBirthDate(),
                    mainGodparent: parent.id,
                    type: 'dependent'
                })
                .then(({ data }) => data.status === 200 ? setNewUser(false) : setNewUser(false))
                .catch(e => console.log(e))

            })
            .catch(e => console.log(e))

            //reset values
            setAge(null)
            setNewUser(false)
            return 
        }

        // if not dependent user
        let type = 'autonomous'
        if (godparent) {
            type = 'godparent'
        }
        console.log('type', type)
        usersignup({
            name,
            email,
            password,
            birthDate : getFormattedBirthDate(),
            type,
            descr: godparentType,
        })
        .then(({ data }) => data.status === 200 ? setNewUser(false) : setNewUser(false))
        .catch(e => console.log(e))

        //reset values
        setAge(null)
        setNewUser(false)
    }

    const signin = () => {
        usersignin({ email, password })
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
                    secureTextEntry={hidePassConfirm}
                    right={<TextInput.Icon icon='eye' onPress={() => setHidePassConfirm(!hidePassConfirm)} />}
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
                { age && age < 16 && !godparentId ? 
                Alert.alert(`Usuario menor de 16 anos`, `É necessário informar o ID do padrinho ou madrinha para continuar`,[
                            { text: 'OK' }], { cancelable: true }) : null }
                { age && age < 16 ?
                <TextInput
                    value={godparentId}
                    label='ID do(a) Padrinho/Madrinha'
                    onChangeText={(id) => setGodparentId(id)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='37'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='key-outline' />}
                />  : null}
                {godparent ? 
                <TextInput
                    value={godparentType}
                    label='Tipo de Padrinho/Madrinha'
                    onChangeText={(type) => setGodparentType(type)}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='Ex: Mãe'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='account' />}
                />  : null }
                {age && age > 16 ?
                <View style={styles.checkBox}>
                    <Checkbox
                        status={godparent ? 'checked' : 'unchecked'}
                        onPress={() => setGodparent(!godparent)}
                        color='purple'
                    />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sou Padrinho/Madrinha</Text>
                    </View>
                </View>
                    : null}
                {!newUser 
                    ?  <Button onPress={() => signin()} >LOGIN</Button>
                    : <Button onPress={() => signup()} >REGISTRAR-SE</Button>}   
                {!newUser
                ?  <Button onPress={() => { 
                    setNewUser(!newUser) 
                    setAge(null)
                    setGodparent(false) 
                }} >REGISTRE-SE</Button>
                :  <Button onPress={() => {
                    setNewUser(!newUser) 
                    setAge(null)
                    setGodparent(false)
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
    checkBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingRight: 10, 
        margin: 10,
    },
})