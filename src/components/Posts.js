import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let arrayPosts = [];
        docs.forEach(doc => {
          arrayPosts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posts: arrayPosts, loading: false });
      });
  }

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
    const { posts, loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.username}>{item.data.email}</Text>
                <Text style={styles.message}>{item.data.posteo}</Text>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => this.handleLike(item.id, item.data.likes)}
                >
                  <Icon
                    name={item.data.likes.includes(auth.currentUser.email) ? 'heart' : 'heart-o'} 
                    size={24} 
                    color='#28a745'  
                  />
                </TouchableOpacity>
                <Text style={styles.likeCount}>
                  {item.data.likes.length} {item.data.likes.length === 1 ? 'like' : 'likes'}
                </Text>
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
    backgroundColor: '#e9f7ef',
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

export default Posts;
