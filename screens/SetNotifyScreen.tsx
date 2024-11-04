import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {API_BASE_URL} from '@env';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SetNotifyScreen: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const url = params?.data;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);

  const handleSubmit = async () => {
    const durationInHours = parseInt(duration, 10);

    // input validation
    if (!phoneNumber || !duration) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (isNaN(durationInHours) || durationInHours < 1 || durationInHours > 48) {
      Alert.alert('Error', 'Duration must be between 1 and 48 hours.');
      return;
    }

    // formatting number
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    try {
      const response = await axios.post(`${API_BASE_URL}/monitor`, {
        url,
        phone_number: formattedPhoneNumber,
        duration: durationInHours,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Monitoring started!');
        setIsMonitoring(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number.startsWith('+91')) {
      return `+91${number.replace(/\s+/g, '').trim()}`;
    }
    return number.replace(/\s+/g, '').trim();
  };

  const handleStopMonitoring = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/stop_monitoring`, {
        phone_number: phoneNumber,
      });
      if (response.status === 200) {
        setIsMonitoring(false);
        Alert.alert('Success', 'Monitoring stopped!');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.main}>
      {!isMonitoring && (
        <View style={styles.back}>
          <Icon
            name="chevron-back"
            size={20}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
          <Text style={{fontSize: 18}} onPress={() => navigation.goBack()}>
            Back
          </Text>
        </View>
      )}
      <Text style={styles.url}>URL: {url}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Duration in hours (1 to 48)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isMonitoring ? handleStopMonitoring : handleSubmit}>
        <Text style={styles.buttonText}>
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetNotifyScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#90e0ef',
    position: 'relative',
  },
  url: {
    paddingBottom: 18,
    fontSize: 20,
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
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  back: {
    position: 'absolute',
    top: 18,
    left: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
