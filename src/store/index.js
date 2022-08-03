import { createStore } from 'easy-peasy';

const store = createStore({
  user: {
    name: 'Jordan',
    email: 'jordan@gmail.com',
    admin: true,
  },
});

export default store;
