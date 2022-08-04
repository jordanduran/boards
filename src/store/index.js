import { createStore, action, computed } from 'easy-peasy';

const store = createStore({
  user:
    'user' in sessionStorage ? JSON.parse(sessionStorage.getItem('user')) : {},
  cart:
    'cart' in sessionStorage ? JSON.parse(sessionStorage.getItem('cart')) : [],
  cartCount: computed((state) => state.cart.length),

  setSignedInUser: action((state, payload) => {
    state.user = payload;
  }),
  addToCart: action((state, payload) => {
    state.cart = [...state.cart, payload];
    const updatedCart = state.cart.map((product, index) => {
      return { ...product, idx: index };
    });
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    state.cart = updatedCart;
  }),

  deleteFromCart: action((state, payload) => {
    const updatedCart = state.cart.filter((product) => product.idx !== payload);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    state.cart = updatedCart;
  }),

  addToCartCount: action((state) => {
    state.cartCount = state.cartCount + 1;
  }),
});

export default store;
