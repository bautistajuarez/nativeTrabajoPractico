import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db } from "../firebase/config";

class UsuariosSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      users: [],
      filteredUsers: [],
    };
  }

  handleInputChange = (text) => {
    this.setState({ query: text });
  }

  handleSearch = () => {
    const { query, users } = this.state;
    if (query.trim() !== "") {
      const filtered = users.filter(user =>
        user.userName.toLowerCase() === query.toLowerCase() 
      );
      this.setState({ filteredUsers: filtered });
    } else {
      this.setState({ filteredUsers: users });
    }
  }

  componentDidMount() {
    db.collection('users')
      .onSnapshot(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          users.push(doc.data());
        });
        this.setState({ users: users, filteredUsers: users });
      }, error => {
        console.error("Error al obtener usuarios:", error);
      });
  }
  handleSubmit = () => {
    const { mensaje } = this.state;
    const user = auth.currentUser;
  
    if (mensaje.trim() !== '') {
      db.collection('posts').add({
        mensaje: mensaje,
        owner: user.email,
        likes: [],
        createdAt: new Date(),
      })
      .then(() => {
        this.setState({ mensaje: '' });
      })
      .catch((error) => {
        console.error("Error al crear el post: ");
      });
    }
  };

  render() {
    const { filteredUsers } = this.state;
    const usersToShow = filteredUsers.slice(0, 16);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Usuario"
          placeholderTextColor="#aaa"
          value={this.state.query}
          onChangeText={this.handleInputChange}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

        {filteredUsers.length === 0 ? (
          <Text style={styles.message}>No hay resultados para mostrar</Text>
        ) : (
          <FlatList
            data={usersToShow}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <Image source={{ uri: item.profilePicture }} style={styles.userImage} />
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 19,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UsuariosSearch;
