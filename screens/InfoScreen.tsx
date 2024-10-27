import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const InfoScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={30}
          color={'#fff'}
          onPress={() => {
            navigation.navigate('HomeScreen' as never);
          }}
        />
        <Text style={styles.screenname}>Information</Text>
      </View>
    </View>
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
    // backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 15,
    paddingVertical: 17,
  },
  screenname: {
    color: '#fff',
    fontSize: 20,
  },
});
