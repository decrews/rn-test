import store from './store';
import { Dimensions } from 'react-native';

export function startEventListeners() {
  Dimensions.addEventListener('change', (data) => {
    store.dispatch({ type: 'update-screen', screen: data.screen });
  });
}

startEventListeners();
