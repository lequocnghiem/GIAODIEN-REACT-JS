import httpAxios from "../httpAxios";

function addToCart(data) {
  return httpAxios.post("cart/addCart",data)
}

function removeFromCart(productId) {
  return httpAxios.delete(`cart/${productId}`);
}

function getCartItems(id) {
  return httpAxios.get(`cart/${id}`);
}

function getCartTotal() {
  return httpAxios.get("cart/total");
}

const updateCartItemQuantity = (productId, newQuantity) => {
  return httpAxios.put(`/cart/update/${productId}/${newQuantity}`);
};


const CartService = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCartItems: getCartItems,
  getCartTotal: getCartTotal,
  updateCartItemQuantity:updateCartItemQuantity
};

export default CartService;
