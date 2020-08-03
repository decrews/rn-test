const { Dimensions } = require('react-native');

const initialState = {
  screen: Dimensions.get('window'),
  currentUser: {},
  sifts: [],
  loadingSifts: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'load-user':
      return { ...state, currentUser: action.payload };
    case 'save-draft':
      return { ...state, draft: action.payload };
    case 'load-sifts':
      return { ...state, loadingSifts: true };
    case 'update-sifts':
      return { ...state, loadingSifts: false, sifts: action.sifts };
    case 'update-screen':
      return { ...state, screen: action.payload };
    default:
      return state;
  }
}
