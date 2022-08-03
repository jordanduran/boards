import { createStore, action } from 'easy-peasy';

const store = createStore({
  setSignedInUser: action((state, payload) => {
    state.user = payload;
  }),
  user: null,
});

export default store;
