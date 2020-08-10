import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/Login';
import ComposeScreen from '../screens/Compose';
import Inbox from '../screens/Inbox';
import Drafts from '../screens/Drafts';

// const AppNavigatorConfig = {
//   initialRouteName: 'Compose',
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: '#f4511e',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//     },
//   },
// };

const InboxRouteConfigs = {
  Inbox: { screen: Inbox },
  Compose: { screen: ComposeScreen },
};

const InboxNavigator = createStackNavigator(InboxRouteConfigs, { headerMode: 'none' });

const AppNavigatorConfig = {
  initialRouteName: 'InboxStack',
};

const DrawerRouteConfigs = {
  InboxStack: {
    screen: InboxNavigator,
    navigationOptions: {
      drawerLabel: 'Inbox',
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      drawerLabel: 'Login',
    },
  },
  Drafts: { screen: Drafts },
};

const AppNavigator = createDrawerNavigator(DrawerRouteConfigs, AppNavigatorConfig);

export default AppNavigator;
