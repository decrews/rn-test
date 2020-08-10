const { Dimensions } = require('react-native');

const initialState = {
  screen: Dimensions.get('window'),
  currentUser: {},
  sifts: [],
  loadingSifts: false,
  drafts: [],
  currentDraft: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'load-user':
      return { ...state, currentUser: action.payload };
    case 'save-draft':
      const drafts = Array.from(state.drafts);

      if (action.payload.id) {
        const currentDraft = drafts.find((draft) => draft.id === action.payload.id);
        if (currentDraft) {
          // update the current draft
          currentDraft.recipient = action.payload.recipient;
          currentDraft.subject = action.payload.subject;
          currentDraft.body = action.payload.body;
        } else {
          // add a new draft
          drafts.push(action.payload);
        }
      }

      return { ...state, drafts };
    case 'delete-draft':
      let newDrafts = Array.from(state.drafts);
      if (action.payload) {
        newDrafts = newDrafts.filter((draft) => draft.id != action.payload);
      }

      return { ...state, drafts: newDrafts };
    case 'load-sifts':
      return { ...state, loadingSifts: true };
    case 'update-sifts':
      return { ...state, loadingSifts: false, sifts: action.payload };
    case 'update-screen':
      return { ...state, screen: action.payload };
    default:
      return state;
  }
}
