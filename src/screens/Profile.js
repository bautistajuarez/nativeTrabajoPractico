import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser ? auth.currentUser.email : "",
      user: 'User',
      posts: []
    };
  }

  componentDidMount() {
   
      auth.onAuthStateChanged(user => {
          if (!user) {
              this.props.navigation.navigate("Login");
          } else {
              db.collection("users")
               .where("email", "==", auth.currentUser.email)
               .onSnapshot(snapshot => {
                   if (!snapshot.empty) {
                        const doc = snapshot.docs[0];
                        this.setState({ user: doc.data().userName });
                      }
                  });

  
          }
      });


      db.collection('posts')
        .where('email', '==', auth.currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          let posts = [];
          snapshot.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({
            posts: posts
          });
        });
    
  }

  handleDelete = (id) => {
    db.collection('posts')
        .doc(id).delete()
        .then(() => {
        })
        .catch((error) => {
            console.error('Ha ocurrido un error', error);
        });
};


  handleSignOut = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('No se pudo cerrar sesion', error);
      });
  };

  handleLike = (postId, likes) => {
    const user = auth.currentUser.email;
    if (likes.includes(user)) {
      db.collection('posts')
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(user),
        });
    } else {
      db.collection('posts')
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(user),
        });
    }
  };

  render() {
    const { user, email, posts } = this.state;
    return (
      <>

        <View style={styles.header}>
          <Text style={styles.profile}>Mi Perfil</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={() => this.handleSignOut()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.infoUsuario}>
          <Text style={styles.mail}> Usuario: {this.state.user} </Text>
          <Text style={styles.mail}> Email: {email} </Text>
          <Text style={styles.cantidadPosteos}>Cantidad de posteos: {posts.length}</Text>
        </View>
        {posts.length === 0 ? (
          <View style={styles.ceroPosteos}>
            <Text style={styles.textoCeroPosteos}>No hay ningún post subido</Text>
          </View>
        ) : (
          <FlatList
      data={this.state.posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <View style={styles.postContainer}>
        <Text style={styles.username}>{item.data.email}</Text>
        <Text style={styles.message}>{item.data.posteo}</Text>
          <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => this.handleDelete(item.id)}
        >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
      </View>
  )}
/>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa'
  },
  profile: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    position: 'absolute'
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mail: {
    fontSize: 25,
    color: '#555',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  cantidadPosteos: {
    fontSize: 18,
    color: '#555',
    marginTop: 5
  },
  infoUsuario: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center'
  },
  ceroPosteos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoCeroPosteos: {
    fontSize: 16,
    color: 'gray'
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  likeCount: {
    fontSize: 14,
    color: '#564a38',
    marginTop: 5,
    textAlign: 'right',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#28a745',
  },
  message: {
    fontSize: 18,
    fontFamily: 'serif',
    padding: 10,
    backgroundColor: '#fefae0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4c9a0',
    marginBottom: 10,
    color: '#333333',
  },
  deleteButton: {
    backgroundColor: '#dc3545', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end', 
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  likeButton: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  likeCount: {
    fontSize: 14,
    color: '#564a38',
    marginTop: 5,
    textAlign: 'right',
  },
});


export default Profile;