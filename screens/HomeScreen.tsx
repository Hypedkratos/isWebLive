import {
  StyleSheet,
  Text,
  BackHandler,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const checkWebsite = async () => {
    if (!url) {
      Alert.alert('Error', 'Please enter a URL first');
      return;
    }

    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }

    try {
      setLoading(true);
      const response = await axios.get(formattedUrl);
      if (response.status === 200) {
        Alert.alert('Success', 'The website is live!');
      } else {
        Alert.alert('Error', 'The website is not live');
      }
    } catch (error) {
      Alert.alert('Error', 'The URL is invalid');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.headertext}>Enter the URL</Text>

      <TextInput
        style={styles.input}
        placeholder="Website URL (e.g., https://example.com)"
        value={url}
        onChangeText={text => setUrl(text)}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={checkWebsite}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Check Website</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    backgroundColor: '#90e0ef',
    position: 'relative',
  },
  headertext: {
    color: '#1b263b',
    fontSize: 25,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#1b263b',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
