import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            error: ""
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }

    handleRegister(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection("users").add({
                    email: this.state.email,
                    userName: this.state.userName
                })
                .then(() => {
                    this.setState({ registered: true });
                    this.props.navigation.navigate('Login');
                })
                .catch(e => console.log("Error", e));
            })
            .catch(error => {
                console.log(error.message);
                this.setState({ error: error.message });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>REGISTER</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de Usuario'
                    onChangeText={text => this.setState({ userName: text })}
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Text style={styles.errorText}>{this.state.error}</Text>

                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={() => this.handleRegister(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.loginLink}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    registerButton: {
        width: '90%',
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    loginLink: {
        color: '#1E90FF',
        marginTop: 20,
        fontSize: 16,
    },
});
