import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Posts from "../components/Posts";
import { auth, db } from "../firebase/config";

class Home extends Component {
    
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
  }
    render() {
        const user = auth.currentUser;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pantalla Home de Xmedia</Text>
                <Text style={styles.subtitle}>¡La red social ideal para estar al tanto de todo!</Text>
                <Text style={styles.sectionHeader}>Publicaciones</Text>
                <Posts />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#ffffff',
    width: '100%', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#28a745',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    textShadowColor: '#d4d4d4',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6c757d',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#28a745',
    paddingBottom: 5,
  },
});




export default Home;

