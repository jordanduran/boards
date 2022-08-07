import { createStore, action, computed } from 'easy-peasy';

const store = createStore({
  user:
    'user' in sessionStorage
      ? JSON.parse(sessionStorage.getItem('user'))
      : null,
  cart:
    'cart' in sessionStorage ? JSON.parse(sessionStorage.getItem('cart')) : [],
  orderShippingInfo:
    'orderShippingInfo' in sessionStorage
      ? JSON.parse(sessionStorage.getItem('orderShippingInfo'))
      : null,
  orderBillingInfo:
    'orderBillingInfo' in sessionStorage
      ? JSON.parse(sessionStorage.getItem('orderBillingInfo'))
      : null,
  productsPurchased: [],
  cartCount: computed((state) =>
    state.cart.reduce((accum, product) => accum + product.quantity, 0)
  ),

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
    state.purchasedProducts = updatedCart;
  }),

  addToCartCount: action((state, payload) => {
    state.cartCount = state.cartCount + payload;
  }),

  deleteFromCart: action((state, payload) => {
    const updatedCart = state.cart.filter((product) => product.idx !== payload);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    state.cart = updatedCart;
  }),

  clearCart: action((state) => {
    state.cart = [];
  }),

  addOrderShippingInfo: action((state, payload) => {
    sessionStorage.removeItem('orderShippingInfo');
    sessionStorage.setItem('orderShippingInfo', JSON.stringify(payload));
    state.orderShippingInfo = payload;
  }),

  addOrderBillingInfo: action((state, payload) => {
    sessionStorage.removeItem('orderBillingInfo');
    sessionStorage.setItem('orderBillingInfo', JSON.stringify(payload));
    state.orderBillingInfo = payload;
  }),

  addProductsPurchased: action((state, payload) => {
    state.productsPurchased = payload;
  }),
});

export default store;
