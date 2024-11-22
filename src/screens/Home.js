import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Posts from "../components/Posts";
import { auth, db } from "../firebase/config";

class Home extends Component {
    
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
      padding: 20,
      backgroundColor: '#ffffff', 
  },
  title: {
      fontSize: 28, 
      fontWeight: 'bold', 
      marginBottom: 15,
      color: '#28a745', 
      textAlign: 'center',
      fontFamily: 'sans-serif-condensed', 
      textShadowColor: '#d4d4d4', 
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 2,
  },
  subtitle: {
      fontSize: 18,
      color: '#333333', 
      marginBottom: 10,
      textAlign: 'center',
      lineHeight: 24,
  },
  sectionHeader: {
      fontSize: 24,
      fontWeight: '700', 
      color: '#6c757d', 
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
      textTransform: 'uppercase', 
      letterSpacing: 1.5, 
      borderBottomWidth: 2,
      borderBottomColor: '#28a745', 
      paddingBottom: 5,
  },
});


export default Home;

