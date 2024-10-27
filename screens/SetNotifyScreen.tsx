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

const SetNotifyScreen: React.FC = () => {
  const {params} = useRoute();
  const url = params?.data;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);

  const handleSubmit = async () => {
    const durationInHours = parseInt(duration, 10);

    // Validate input
    if (!phoneNumber || !duration) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (isNaN(durationInHours) || durationInHours < 1 || durationInHours > 48) {
      Alert.alert('Error', 'Duration must be between 1 and 48 hours.');
      return;
    }

    try {
      const response = await axios.post(
        'https://web-production-1e543.up.railway.app/monitor',
        {
          url,
          phone_number: phoneNumber,
          duration: durationInHours,
        },
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Monitoring started!');
        setIsMonitoring(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleStopMonitoring = async () => {
    try {
      const response = await axios.post(
        'https://web-production-1e543.up.railway.app/stop_monitoring',
        {
          phone_number: phoneNumber,
        },
      );
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
});
