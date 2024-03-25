/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

function App(): React.JSX.Element {
  const requestUserPermission = async (): Promise<boolean> => {
    try {
      const authStatus = await messaging().requestPermission();

      const fcmToken = await messaging().getToken();

      console.log(fcmToken);

      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabled;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <SafeAreaView>
      <Text>Hello, this is a sample react native Push Notification </Text>
      <Button
        title="Register push notifications"
        onPress={async () => await requestUserPermission()}
      />
    </SafeAreaView>
  );
}

export default App;
