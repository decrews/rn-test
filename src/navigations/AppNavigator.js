import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from '../screens/Login';
import ComposeScreen from '../screens/Compose';

const AppNavigatorConfig = {
  initialRouteName: 'Compose',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};

const RouteConfigs = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      drawerLabel: 'Login Screen',
    },
  },
  Compose: { screen: ComposeScreen },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;
