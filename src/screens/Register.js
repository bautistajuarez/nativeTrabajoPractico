import React, { Component } from 'react'
import { Text, View, TextInput , TouchableOpacity, StyleSheet } from "react-native"
import { db, auth } from "../firebase/config";


export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            userName: "",
            error: ""
        }
    }


    handleRegister(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(
                response => {
                    db.collection("users").add({
                        email: this.state.email,
                        userName: this.state.userName
                    })
                        .then(() => {
                            this.setState({ registered: true })
                            this.props.navigation.navigate('Login');
                        })
                        .catch(e => console.log("Error", e));
                }
            )
            .catch(error => {
                console.log(error.message);
                this.setState({ error: error.message })
            }
            )
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >REGISTER</Text>
                <TextInput
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    keyboardType='default'
                    placeholder='Nombre de Usuario'
                    onChangeText={text => this.setState({ userName: text })}
                    value={this.state.userName}
                />
                <TextInput
                    keyboardType='password'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <Text>{this.state.error}</Text>
                
                <TouchableOpacity onPress={() => this.handleRegister(this.state.email, this.state.password, this.state.userName)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>Ya tengo cuenta</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    }

})
