import {
  StyleSheet,
  Text,
  View,
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
import {useNavigation} from '@react-navigation/native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
// icons imports
import Icon from 'react-native-vector-icons/Entypo';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  // states
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  // data to be sent to next page
  const [formattedURLdata, setFormattedURLdata] = useState<string>('');
  // pin website btn visiblity mark
  const [isPinBtnVisible, setIsPinBtnVisible] = useState<Boolean>(false);
  // functions
  const checkWebsite = async () => {
    if (!url) {
      Alert.alert('Error', 'Please enter a URL first');
      return;
    }

    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
      setFormattedURLdata(formattedUrl);
    }

    try {
      setLoading(true);
      const response = await axios.get(formattedUrl);
      if (response.status === 200) {
        Alert.alert('Success', 'The website is live!');
        setIsPinBtnVisible(true);
      } else {
        Alert.alert('Error', 'The website is not live');
      }
    } catch (error) {
      Alert.alert('Error', 'The URL is invalid');
    } finally {
      setLoading(false);
    }
  };

  const handleSetNotify = () => {
    if (url === '') {
      Alert.alert('Warning', 'Provide a URL first');
    } else {
      navigation.navigate('SetNotifyScreen', {data: formattedURLdata});
    }
  };

  // use effects
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
      <View style={styles.topright}>
        <Icon
          name="info-with-circle"
          size={30}
          color={'#0077b6'}
          onPress={() => {
            navigation.navigate('InfoScreen' as never);
          }}
        />
      </View>
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
      <View style={styles.btncontainer}>
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
        {isPinBtnVisible && (
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={() => {
              handleSetNotify();
            }}>
            <Text style={styles.buttonText}>Pin Website</Text>
          </TouchableOpacity>
        )}
      </View>
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
  topright: {
    position: 'absolute',
    top: 15,
    right: 25,
    backgroundColor: '#fff',
    borderRadius: 200,
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
  btncontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
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
    textAlign: 'center',
  },
});
