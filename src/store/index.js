import { createStore, action } from 'easy-peasy';

const store = createStore({
  user:
    'user' in sessionStorage ? JSON.parse(sessionStorage.getItem('user')) : {},
  cart: [],
  cartCount: 0,
  setSignedInUser: action((state, payload) => {
    state.user = payload;
  }),
  addToCart: action((state, payload) => {
    state.cart = [...state.cart, payload];
    const updatedCart = state.cart.map((product, index) => {
      return { ...product, idx: index };
    });
    state.cart = updatedCart;
  }),
  deleteFromCart: action((state, payload) => {
    const updatedCart = state.cart.filter((product) => product.idx !== payload);
    state.cart = updatedCart;
  }),
  addToCartCount: action((state) => {
    state.cartCount = state.cartCount + 1;
  }),
});

export default store;
