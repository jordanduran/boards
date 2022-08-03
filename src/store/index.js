import { createStore, action } from 'easy-peasy';

const store = createStore({
  user:
    'user' in sessionStorage ? JSON.parse(sessionStorage.getItem('user')) : {},
  setSignedInUser: action((state, payload) => {
    state.user = payload;
  }),
});

export default store;
