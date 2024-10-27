import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SetNotifyScreen from './screens/SetNotifyScreen';
import InfoScreen from './screens/InfoScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SetNotifyScreen"
          component={SetNotifyScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="InfoScreen"
          component={InfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
