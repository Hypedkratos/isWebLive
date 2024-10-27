import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen' as never);
    }, 3000);
  }, [navigation]);
  return (
    <KeyboardAvoidingView style={styles.maincontainer}>
      <View style={styles.animationcontainer}>
        <LottieView
          source={require('../animations/splash.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>IsWebLive</Text>
        <Text style={styles.copyright}>Made with ❤️ by Hypedkratos</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#a2d2ff',
  },
  animationcontainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  animation: {
    width: 300,
    height: 400,
  },
  text: {
    fontSize: 60,
    fontWeight: '800',
    position: 'absolute',
    top: '27%',
    color: '#1b263b',
  },
  copyright: {
    position: 'absolute',
    bottom: '5%',
    fontSize: 14,
    color: '#fff',
  },
});
