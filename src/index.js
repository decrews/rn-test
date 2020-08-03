import React from 'react';
import Navigator from './navigations';
import store from './store';
import { Provider } from 'react-redux';

import './session';

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
