import React from 'react';
import { SafeAreaView, Text, Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';

const LoginScreen = ({ navigation }) => {
  const styles = getStyles();

  const user = useSelector((state) => state.currentUser);
  const screen = useSelector((state) => state.screen);

  const dispatch = useDispatch();

  const username = `Current User: ${user.name}`;

  return (
    <SafeAreaView style={styles.contianer}>
      <Header />
      <ScrollView style={{ height: '100%', width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.text}>{`Screen: Login`}</Text>
        {user && user.name && <Text style={[styles.text, { paddingTop: 20 }]}>{username}</Text>}
        {!user.name && (
          <Pressable onPress={() => dispatch({ type: 'load-user', user: { name: 'Danielle' } })}>
            <Text style={styles.button}>Login</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Card = ({ title, text }) => {
  return (
    <View style={{ width: '100%', padding: 10 }}>
      <View style={{ width: '100%', backgroundColor: '#222', padding: 15, alignItems: 'center', borderRadius: 13 }}>
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, paddingBottom: 15 }}>{title}</Text>
        <Text style={{ color: 'white' }}>{text}</Text>
      </View>
    </View>
  );
};

const getStyles = (theme, screen) => ({
  contianer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    fontSize: 20,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
