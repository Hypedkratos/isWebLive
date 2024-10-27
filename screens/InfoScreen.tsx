import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const InfoScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={22}
          color={'#fff'}
          onPress={() => {
            navigation.navigate('HomeScreen' as never);
          }}
        />
        <Text style={styles.screenname}>Information</Text>
      </View>
      <View style={styles.infoitems}>
        <Text style={styles.bold}>How to use this app?</Text>
        <Text style={styles.normal}>
          1. Enter the URL of the website, whose live status you want to check.
        </Text>
        <Text style={styles.normal}>
          2. Press the "Check" button to check if the website is live.
        </Text>
        <Text style={styles.normal}>
          3. If the website is live, you will be informed via alert immediately.
        </Text>
        <Text style={styles.normal}>
          4. If the website is not live, you will be informed via alert
          immediately.
        </Text>
        <Text style={styles.normal}>
          5. If you want to start monitoring if the app/website goes down, press
          the "Pin Website" button. You'll be taken to a new screen.
        </Text>
        <Text style={styles.normal}>
          6. Enter the phone number where you want to receive the notification
          and the duration in hours for which you want to monitor the website.
          Then start monitoring. If the website goes down within the specified
          duration, you'll be notified via SMS and whatsapp message.
        </Text>
        <Text style={styles.normal}>7. Stop monitoring if you want.</Text>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90e0ef',
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 23,
    paddingVertical: 30,
  },
  screenname: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  infoitems: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  bold: {
    color: 'black',
    fontSize: 24,
    paddingBottom: 8,
    fontWeight: '500',
  },
  normal: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
});
