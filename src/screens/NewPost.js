import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db, auth } from '../firebase/config';

export default class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posteo: "",
    };
  }

  newPost = () => {
    db.collection("posts").add({
      createdAt: new Date(),
      email: auth.currentUser.email,
      likes: [],
      posteo: this.state.posteo,
    })
      .then(() => {
        this.setState({ posteo: "" });
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => {
        console.error("Error al crear el posteo: ", error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CREAR POSTEO</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="En qué estás pensando..."
          onChangeText={(text) => this.setState({ posteo: text })}
          value={this.state.posteo}
        />

        <TouchableOpacity style={styles.registerButton} onPress={this.newPost}>
          <Text style={styles.registerButtonText}>Crear Post</Text>
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
});
