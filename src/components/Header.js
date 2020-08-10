import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NavigationContext } from 'react-navigation';
import colors from '../styles/colors';

export default function Header({ title, onPress, buttonText }) {
  const styles = getStyles();
  const navigation = useContext(NavigationContext);
  const button = buttonText ? buttonText : '=';

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress ? onPress : () => navigation.openDrawer()}>
        <View style={styles.menuItemContainer}>
          <Text style={styles.textMenu}>{button}</Text>
        </View>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.menuItemContainer} />
    </View>
  );
}

const getStyles = () => ({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    height: 38,
    backgroundColor: 'white',
  },
  textMenu: {
    color: colors.primaryColor,
    fontSize: 30,
  },
  menuItemContainer: {
    height: 38,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
